import { computed, ref, watch } from "vue";

export type TaskId = string;
export type TaskTitle = string;
export type CreatedAt = string;
export type CompletedAt = string;
export type DifferenceInDaysLabel = string;
export type DateLabel = string;
export interface Task {
  taskId: TaskId;
  title: TaskTitle;
  createdAt: CreatedAt;
}

export interface TaskHistory {
  title: TaskTitle;
  completedAt: CompletedAt;
}

export interface TaskHistoryInfo extends TaskHistory {
  differenceInDaysLabel: DifferenceInDaysLabel;
  dateLabel: DateLabel;
}

// global
const tasks = ref<Task[]>([]);
const taskHistories = ref<TaskHistory[]>([]);

// save
watch(
  tasks,
  (v) => {
    localStorage.setItem("tasks", JSON.stringify(v));
  },
  { deep: true }
);
watch(
  taskHistories,
  (v) => {
    localStorage.setItem("taskHistories", JSON.stringify(v));
  },
  { deep: true }
);

export function useTask() {
  // functions
  function loadTasks() {
    var tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      var _tasks: Task[] = JSON.parse(tasksJson);
      tasks.value.splice(0, tasks.value.length, ..._tasks);
    }
    var taskHistoriesJson = localStorage.getItem("taskHistories");
    if (taskHistoriesJson) {
      var _taskHistories: TaskHistory[] = JSON.parse(taskHistoriesJson);
      taskHistories.value.splice(
        0,
        taskHistories.value.length,
        ..._taskHistories
      );
    }
  }

  function addBlankTask() {
    tasks.value.push({
      taskId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      title: "",
    });
  }
  function getTask(taskId: TaskId) {
    return tasks.value.find((v) => v.taskId == taskId)!;
  }
  function findTaskHistory(taskTitle: TaskTitle): TaskHistoryInfo | null {
    var taskHistory = taskHistories.value.find((v) => v.title == taskTitle);
    return taskHistory
      ? {
          ...taskHistory,
          differenceInDaysLabel:
            Math.floor(
              (new Date().getTime() -
                new Date(taskHistory.completedAt).getTime()) /
                (1000 * 60 * 60 * 24)
            ) + "日前",
          dateLabel: new Date(taskHistory.completedAt).toLocaleDateString(),
        }
      : null;
  }

  function completeTask(taskId: TaskId) {
    var task = getTask(taskId);
    if (task.title) {
      var taskHistory = findTaskHistory(task.title);
      if (taskHistory) {
        taskHistory.completedAt = new Date().toISOString();
      } else {
        taskHistories.value.push({
          title: task.title,
          completedAt: new Date().toISOString(),
        });
      }
    }
    removeTask(taskId);
  }

  function removeTask(taskId: TaskId) {
    var index = tasks.value.findIndex((v) => v.taskId == taskId);
    if (index != -1) {
      tasks.value.splice(index, 1);
    }
  }

  const taskHistoryInfos = computed(() =>
    taskHistories.value.map((v) => ({
      ...v,
      differenceInDaysLabel:
        Math.floor(
          (new Date().getTime() - new Date(v.completedAt).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + "日前",
      dateLabel: new Date(v.completedAt).toLocaleDateString(),
    }))
  );
  return {
    tasks,
    addBlankTask,
    completeTask,
    removeTask,
    loadTasks,
    taskHistoryInfos,
    findTaskHistory,
  };
}
