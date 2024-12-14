import { computed, nextTick, ref, watch } from "vue";
import { TagId } from "./Tag";

export type TaskCategoryId = string;
export type TaskCategoryName = string;
export type TaskCategoryIcon = string;
export type TaskCategoryColor = string;

export type TaskId = string;
export type TaskTitle = string;
export type CreatedAt = string;
export type CompletedAt = string;
export type DifferenceInDaysLabel = string;
export type DateLabel = string;
export type Completed = boolean;

export type MoveTaskModeFlag = boolean;

export interface TaskCategory {
  taskCategoryId: TaskCategoryId;
  taskCategoryName: TaskCategoryName;
  taskCategoryIcon: TaskCategoryIcon;
  taskCategoryColor: TaskCategoryColor;
}

export interface Task {
  taskId: TaskId;
  title: TaskTitle;
  createdAt: CreatedAt;
  completed: Completed;
  tagIds: TagId[];
  taskCategoryId: TaskCategoryId;
}

export interface TaskHistory {
  title: TaskTitle;
  tagIds: TagId[];
  completedAt: CompletedAt;
}

export interface TaskHistoryInfo extends TaskHistory {
  differenceInDaysLabel: DifferenceInDaysLabel;
  dateLabel: DateLabel;
}

// global
const taskCategories = ref<TaskCategory[]>([]);
const tasks = ref<Task[]>([]);
const taskHistories = ref<TaskHistory[]>([]);
const newPopTaskId = ref<TaskId | null>(null);
const moveTaskModeFlag = ref<MoveTaskModeFlag>(false);

// save
watch(
  taskCategories,
  (v) => {
    localStorage.setItem("taskCategories", JSON.stringify(v));
  },
  { deep: true },
);
watch(
  tasks,
  (v) => {
    localStorage.setItem("tasks", JSON.stringify(v));
  },
  { deep: true },
);
watch(
  taskHistories,
  (v) => {
    localStorage.setItem("taskHistories", JSON.stringify(v));
  },
  { deep: true },
);

export function useTask() {
  // functions

  function addDefaultTaskCategory() {
    taskCategories.value.push({
      taskCategoryId: crypto.randomUUID(),
      taskCategoryIcon: "mdi-format-list-checkbox",
      taskCategoryName: "TASK",
      taskCategoryColor: "",
    });
  }

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
        ..._taskHistories,
      );
    }
    var taskCategoryJson = localStorage.getItem("taskCategories");
    if (taskCategoryJson) {
      var _taskCategories: TaskCategory[] = JSON.parse(taskCategoryJson);
      taskCategories.value.splice(
        0,
        taskCategories.value.length,
        ..._taskCategories,
      );
    } else {
      addDefaultTaskCategory();
    }
  }

  function addBlankTask(
    taskCategoryId?: TaskCategoryId,
    insertAfterTaskId?: TaskId,
  ) {
    var taskId = crypto.randomUUID();
    var newTask = {
      taskId,
      createdAt: new Date().toISOString(),
      title: "",
      completed: false,
      tagIds: [],
      taskCategoryId: taskCategoryId || "",
    };
    if (insertAfterTaskId) {
      tasks.value.splice(
        tasks.value.findIndex((v) => v.taskId == insertAfterTaskId) + 1,
        0,
        newTask,
      );
    } else {
      tasks.value.push(newTask);
    }
    nextTick(() => {
      newPopTaskId.value = taskId;
    });
  }

  function getTask(taskId: TaskId) {
    return tasks.value.find((v) => v.taskId == taskId)!;
  }
  function findTasksByCategoryId(taskCategoryId: TaskCategoryId) {
    return tasks.value.filter((v) => v.taskCategoryId == taskCategoryId);
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
                (1000 * 60 * 60 * 24),
            ) + "日前",
          dateLabel: new Date(taskHistory.completedAt).toLocaleDateString(),
        }
      : null;
  }

  function deleteTaskHistory(taskTitle: TaskTitle) {
    var index = taskHistories.value.findIndex((v) => v.title == taskTitle);
    console.log("deleteTaskHistory", { taskTitle, index });
    if (index != -1) {
      taskHistories.value.splice(index, 1);
    }
  }

  function changeCompleteTask(taskId: TaskId, checked: boolean) {
    var task = getTask(taskId);
    if (task.title) {
      task.completed = checked;
      if (checked) {
        var tagIds = [...task.tagIds];
        var completedAt = new Date().toISOString();
        var taskHistory = findTaskHistory(task.title);
        if (taskHistory) {
          taskHistory.completedAt = completedAt;
          taskHistory.tagIds.splice(0, taskHistory.tagIds.length, ...tagIds);
        } else {
          taskHistories.value.push({
            title: task.title,
            completedAt,
            tagIds,
          });
        }
      }
    }
  }

  function removeCompletedTasks() {
    var removeTargetTaskIds = tasks.value
      .filter((v) => v.completed)
      .map((v) => v.taskId);
    removeTargetTaskIds.forEach(removeTask);
  }
  function removeAllTasks() {
    if (!confirm("全てのタブの全てのタスクを削除します。よろしいですか？")) {
      return;
    }
    if (!confirm("本当によろしいですか？")) {
      return;
    }
    var removeTargetTaskIds = tasks.value.map((v) => v.taskId);
    removeTargetTaskIds.forEach(removeTask);
  }

  function removeTask(taskId: TaskId) {
    var index = tasks.value.findIndex((v) => v.taskId == taskId);
    if (index != -1) {
      tasks.value.splice(index, 1);
    }
  }

  function addTaskTag(taskId: TaskId, tagId: TagId) {
    var task = tasks.value.find((v) => v.taskId == taskId);
    if (task) {
      task.tagIds.push(tagId);
    }
  }

  function removeTaskTag(taskId: TaskId, tagId: TagId) {
    var task = tasks.value.find((v) => v.taskId == taskId);
    if (task) {
      var index = task.tagIds.findIndex((v) => v == tagId);
      task.tagIds.splice(index, 1);
    }
  }

  function setTaskTagIds(taskId: TaskId, tagIds: TagId[]) {
    var task = tasks.value.find((v) => v.taskId == taskId);
    if (task) {
      task.tagIds.splice(0, task.tagIds.length, ...tagIds);
    }
  }

  const taskHistoryInfos = computed(() =>
    taskHistories.value.map((v) => ({
      ...v,
      differenceInDaysLabel:
        Math.floor(
          (new Date().getTime() - new Date(v.completedAt).getTime()) /
            (1000 * 60 * 60 * 24),
        ) + "日前",
      dateLabel: new Date(v.completedAt).toLocaleDateString(),
    })),
  );

  function deleteTaskCategory(taskCategoryId: TaskCategoryId) {
    var index = taskCategories.value.findIndex(
      (v) => v.taskCategoryId == taskCategoryId,
    );
    if (index != -1) {
      taskCategories.value.splice(index, 1);
    }
  }

  function activateMoveTaskMode() {
    moveTaskModeFlag.value = true;
  }

  function deactivateMoveTaskMode() {
    moveTaskModeFlag.value = false;
  }

  function indexOfSameCategory(taskId: TaskId) {
    var categoryTasks = findTasksByCategoryId(getTask(taskId).taskCategoryId);
    return categoryTasks.findIndex((v) => v.taskId == taskId);
  }
  function lengthOfSameCategory(taskId: TaskId) {
    var categoryTasks = findTasksByCategoryId(getTask(taskId).taskCategoryId);
    return categoryTasks.length;
  }
  function canMoveTask(taskId: TaskId, slideCount: number) {
    var index = indexOfSameCategory(taskId);
    if (index == -1) {
      return false;
    }
    var length = lengthOfSameCategory(taskId);
    return index + slideCount >= 0 && index + slideCount <= length - 1;
  }

  function swapTask(taskIdA: TaskId, taskIdB: TaskId) {
    var indexA = tasks.value.findIndex((v) => v.taskId == taskIdA);
    var indexB = tasks.value.findIndex((v) => v.taskId == taskIdB);
    var taskA = tasks.value[indexA];
    var taskB = tasks.value[indexB];
    tasks.value[indexA] = taskB;
    tasks.value[indexB] = taskA;
  }

  function moveTask(taskId: TaskId, slideCount: number) {
    if (canMoveTask(taskId, slideCount)) {
      var categoryTasks = findTasksByCategoryId(getTask(taskId).taskCategoryId);
      var index = indexOfSameCategory(taskId);
      var beforeTaskId = categoryTasks[index + slideCount].taskId;
      swapTask(taskId, beforeTaskId);
    }
  }

  return {
    taskCategories,
    tasks,
    findTasksByCategoryId,
    newPopTaskId,
    addBlankTask,
    changeCompleteTask,
    removeCompletedTasks,
    removeAllTasks,
    loadTasks,
    taskHistoryInfos,
    findTaskHistory,
    deleteTaskHistory,
    addTaskTag,
    removeTaskTag,
    setTaskTagIds,
    addDefaultTaskCategory,
    deleteTaskCategory,

    moveTaskModeFlag,
    activateMoveTaskMode,
    deactivateMoveTaskMode,
    canMoveTask,
    moveTask,
  };
}
