<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-list-item-action start>
        <v-checkbox-btn @change="completeTask" />
      </v-list-item-action>
    </template>
    <template v-slot:title>
      <v-combobox
        v-model="task.title"
        :items="taskHistoryTitles"
        variant="plain"
        hide-details
        single-line
        hide-spin-buttons
        density="compact"
      />
    </template>
    <template v-slot:subtitle>
      <div v-if="completedAt != null">
        前回: {{ completeDifferenceInDays }}日前 ({{ completedAt }})
      </div>
    </template>
  </v-list-item>
</template>
<script lang="ts" setup>
import { nextTick } from "vue";
import { Task, useTask } from "../composables/Task";

interface TaskListItemProps {
  task: Task;
}
const { task } = defineProps<TaskListItemProps>();
const {
  completeTask: _completeTask,
  taskHistoryTitles,
  findTaskHistory,
} = useTask();
const taskHistory = findTaskHistory(task.title);
const completedAt = taskHistory
  ? new Date(taskHistory.completedAt).toLocaleString()
  : null;
const completeDifferenceInDays = taskHistory
  ? Math.floor(
      (new Date().getTime() - new Date(taskHistory.completedAt).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  : 0;
function completeTask() {
  nextTick(() => _completeTask(task.taskId));
}
</script>
