import { computed, ref } from "vue";
import { useTask } from "./Task";

export type BackupRevision = number;
export type BackupDate = string;
export interface Backup {
    revision: BackupRevision;
    date: BackupDate;
    tasksJson: string;
}
const backups = ref<Backup[]>([]);

export function useBackup() {
    const { tasks, loadTasks } = useTask();
    function loadBackups() {
        var backupsJson = localStorage.getItem("backup");
        console.log("loadBackups", { backupsJson });
        if (backupsJson) {
            var _backups: Backup[] = JSON.parse(backupsJson);
            backups.value.splice(0, backups.value.length, ..._backups);
        }
    }
    const currentRevision = computed<number>(() => {
        if (backups.value.length > 0) {
            return Math.max(...backups.value.map(v => v.revision));
        }
        else {
            return 0;
        }
    });
    function createBackup() {
        var revision = currentRevision.value + 1;
        var date = new Date().toISOString();
        var backup = {
            revision,
            date,
            tasksJson: JSON.stringify(tasks.value)
        };
        console.log("createBackup", backup);
        backups.value.push(backup);
        while (backups.value.length > 50) {
            backups.value.shift();
        }
        localStorage.setItem("backup", JSON.stringify(backups.value));
    }
    function restoreBackup(revision: BackupRevision) {
        var backup = backups.value.find(v => v.revision == revision);
        if (backup) {
            if (!confirm(new Date(backup.date).toLocaleString() + "時点のバックアップから復元します。よろしいですか？")) {
                return;
            }
            localStorage.setItem("tasks", backup.tasksJson);
            loadTasks();
        }
    }
    return {
        backups,
        loadBackups,
        createBackup,
        restoreBackup
    }
}