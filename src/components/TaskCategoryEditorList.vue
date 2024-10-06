<template>
  <div>
    <div
      v-for="taskCategory in taskCategories"
      :key="taskCategory.taskCategoryId"
    >
      <TaskCategoryEditor :task-category="taskCategory" />
      <v-divider />
    </div>
    <div style="text-align: center" @click="addDefaultTaskCategory">+</div>
  </div>
</template>

<script lang="ts" setup>
import { useTask } from "../composables/Task";
import TaskCategoryEditor from "./TaskCategoryEditor.vue";

const { taskCategories, addDefaultTaskCategory } = useTask();
</script>
