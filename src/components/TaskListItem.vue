<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-list-item-action start>
        <v-checkbox-btn @change="removeTask" />
      </v-list-item-action>
    </template>
    <template v-slot:title>
      <v-text-field
        v-model="task.title"
        variant="plain"
        hide-details
        single-line
        density="compact"
      />
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
const { removeTask: _removeTask } = useTask();
function removeTask() {
  nextTick(() => _removeTask(task.taskId));
}
</script>
