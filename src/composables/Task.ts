import { computed, ref, watch } from "vue";

export type TaskId = string;
export type TaskTitle = string;
export type CreatedAt = string;
export type CompletedAt = string;
export interface Task {
  taskId: TaskId;
  title: TaskTitle;
  createdAt: CreatedAt;
}

export interface TaskHistory {
  title: TaskTitle;
  completedAt: CompletedAt;
}

// global
const tasks = ref<Task[]>([]);
const taskHistories = ref<TaskHistory[]>([]);

// save
watch(
  tasks,
  (v) => {
    console.log("save tasks");
    localStorage.setItem("tasks", JSON.stringify(v));
  },
  { deep: true }
);
watch(
  taskHistories,
  (v) => {
    console.log("save taskHistories");
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
  function findTaskHistory(taskTitle: TaskTitle) {
    return taskHistories.value.find((v) => v.title == taskTitle) || null;
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

  const taskHistoryTitles = computed(() =>
    taskHistories.value.map((v) => v.title)
  );
  return {
    tasks,
    addBlankTask,
    completeTask,
    removeTask,
    loadTasks,
    taskHistoryTitles,
    findTaskHistory,
  };
}
