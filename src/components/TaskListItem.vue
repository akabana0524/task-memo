<template>
  <v-list-item :base-color="completed ? 'success' : ''">
    <template v-slot:prepend>
      <v-list-item-action start>
        <v-checkbox-btn @change="check" />
      </v-list-item-action>
    </template>
    <template v-slot:title>
      <v-combobox
        v-model="task.title"
        :items="taskHistoryInfos"
        item-title="title"
        item-value="title"
        variant="plain"
        hide-details
        single-line
        hide-spin-buttons
        hide-selected
        :return-object="false"
        density="compact"
      >
        <template v-slot:item="{ item, props }">
          <v-list-item v-bind="props">
            <template v-slot:title>
              {{ item.title }}
            </template>
            <template v-slot:subtitle
              >(前回: {{ item.raw.differenceInDaysLabel }} ({{
                item.raw.dateLabel
              }}))
            </template>
          </v-list-item>
        </template>
      </v-combobox>
    </template>
    <template v-slot:subtitle>
      <div v-if="taskHistory != null">
        前回: {{ taskHistory.differenceInDaysLabel }} ({{
          taskHistory.dateLabel
        }})
      </div>
    </template>
  </v-list-item>
</template>
<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { Task, useTask } from "../composables/Task";

interface TaskListItemProps {
  task: Task;
}
const props = defineProps<TaskListItemProps>();
const { task } = toRefs(props);
const {
  completeTask: _completeTask,
  taskHistoryInfos,
  findTaskHistory,
} = useTask();
const taskHistory = computed(() => findTaskHistory(task.value.title));
const completed = computed(() => task.value.completed);

function check(e: InputEvent) {
  var checked: boolean = (e.target as any).checked;
  task.value.completed = checked;
}
</script>

<style>
.v-field__append-inner {
  display: none;
}
</style>
