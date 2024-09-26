<template>
  <v-list-item :border="1"
    >{{ task.title }}
    <template v-slot:append="{}">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" icon="mdi-dots-vertical" />
        </template>
        <v-list>
          <v-list-item @click="() => removeTask(task.taskId)">
            <v-list-item-title>削除</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template></v-list-item
  >
</template>
<script lang="ts" setup>
import { Task, useTask } from "../composables/Task";

interface TaskListItemProps {
  task: Task;
}
const { task } = defineProps<TaskListItemProps>();
const { removeTask } = useTask();
</script>
