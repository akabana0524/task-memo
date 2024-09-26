import { ref, watch } from "vue";

export type TaskId = string;
export type TaskTitle = string;
export interface Task {
  taskId: TaskId;
  title: TaskTitle;
  createdAt: Date;
}
export interface RegisterTask {
  title: TaskTitle;
}

// global
const tasks = ref<Task[]>([]);
watch(
  tasks,
  (v) => {
    console.log("save localStorage");
    localStorage.setItem("tasks", JSON.stringify(v));
  },
  { deep: true }
);

export function useTask() {
  // functions
  function loadTasks() {
    var tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      console.log({ tasksJson });
      var _tasks: Task[] = JSON.parse(tasksJson);
      tasks.value.splice(0, tasks.value.length, ..._tasks);
    }
  }

  function addTask(registerTask: RegisterTask) {
    var task: Task = {
      taskId: crypto.randomUUID(),
      createdAt: new Date(),
      ...registerTask,
    };
    tasks.value.push(task);
  }

  function removeTask(taskId: TaskId) {
    var index = tasks.value.findIndex((v) => v.taskId == taskId);
    if (index != -1) {
      tasks.value.splice(index, 1);
    }
  }

  return { tasks, addTask, removeTask, loadTasks };
}
