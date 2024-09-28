<template>
  <v-slide-x-transition class="py-0" tag="v-list" group>
    <template v-for="task in tasks" :key="task.taskId">
      <TaskListItem :task="task">{{ task.title }}</TaskListItem>
      <v-divider />
    </template>
  </v-slide-x-transition>
  <v-list-item @click="addBlankTask" key="footer">
    <v-row>
      <v-spacer />
      <v-col cols="auto"><v-icon>mdi-plus</v-icon></v-col>
      <v-spacer />
    </v-row>
  </v-list-item>
</template>

<script lang="ts" setup>
import { useTask } from "../composables/Task";
import TaskListItem from "./TaskListItem.vue";

const { tasks, addBlankTask } = useTask();
</script>
