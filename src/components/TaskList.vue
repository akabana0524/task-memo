<template>
  <draggable
    v-model="tasks"
    tag="v-list"
    group="task"
    @start="drag = true"
    @end="drag = false"
    item-key="taskId"
    :component-data="{ transition: 'slide-y-transition' }"
  >
    <template #item="{ element: task }">
      <TaskListItem :task="task" :key="task.taskId">{{
        task.title
      }}</TaskListItem>
    </template>
    <template #footer>
      <v-list-item @click="addBlankTask">+</v-list-item>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { useTask } from "../composables/Task";
import TaskListItem from "./TaskListItem.vue";

const drag = ref(false);
const { tasks, addBlankTask } = useTask();
</script>
