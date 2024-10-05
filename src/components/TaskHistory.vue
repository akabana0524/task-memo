<template>
  <v-list-item>
    <template v-slot:title>
      {{ taskHistoryInfo.title }}
    </template>
    <template v-slot:subtitle>
      <div style="text-align: end">
        前回: {{ taskHistoryInfo.differenceInDaysLabel }} ({{
          taskHistoryInfo.dateLabel
        }})
      </div>
    </template>
    <template v-slot:append>
      <v-btn icon="mdi-trash-can" @click.stop="_deleteTaskHistory" />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { TaskHistoryInfo, useTask } from "../composables/Task";

interface TaskHistoryProps {
  taskHistoryInfo: TaskHistoryInfo;
}
const props = defineProps<TaskHistoryProps>();
const { taskHistoryInfo } = toRefs(props);
const { deleteTaskHistory } = useTask();
function _deleteTaskHistory() {
  deleteTaskHistory(taskHistoryInfo.value.title);
}
</script>
