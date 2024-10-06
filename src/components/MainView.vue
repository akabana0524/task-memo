<template>
  <v-card>
    <v-tabs v-model="tab" stacked>
      <v-tab
        v-for="taskCategory in taskCategories"
        :value="taskCategory.taskCategoryId"
      >
        {{ taskCategory.taskCategoryName }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item
          v-for="taskCategory in taskCategories"
          :key="taskCategory.taskCategoryId"
          :value="taskCategory.taskCategoryId"
        >
          <TaskList :task-category-id="taskCategory.taskCategoryId" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TaskList from "../components/TaskList.vue";
import { useTask } from "../composables/Task";

const { taskCategories } = useTask();

const tab = ref("");
</script>
