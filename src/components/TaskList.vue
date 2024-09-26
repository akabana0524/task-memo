<template>
  <draggable
    v-if="tasks.length > 0"
    v-model="tasks"
    tag="v-list"
    group="task"
    @start="drag = true"
    @end="drag = false"
    item-key="taskId"
    :component-data="{ transition: 'slide-y-transition' }"
  >
    <template #item="{ element: task }">
      <TaskListItem :task="task" :key="task.taskId" :border="1">{{
        task.title
      }}</TaskListItem>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { useTask } from "../composables/Task";
import TaskListItem from "./TaskListItem.vue";

const drag = ref(false);
const { tasks } = useTask();
</script>
