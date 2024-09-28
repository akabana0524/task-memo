<template>
  <v-list>
    <TaskListItem v-for="task in tasks" :key="task.taskId" :task="task">{{
      task.title
    }}</TaskListItem>

    <v-list-item @click="addBlankTask">
      <v-row>
        <v-spacer />
        <v-col cols="auto"><v-icon>mdi-plus</v-icon></v-col>
        <v-spacer />
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import { useTask } from "../composables/Task";
import TaskListItem from "./TaskListItem.vue";

const { tasks, addBlankTask } = useTask();
</script>
