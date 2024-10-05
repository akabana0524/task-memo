<template>
  <v-list-item :base-color="completed ? 'success' : ''">
    <template v-slot:prepend>
      <v-list-item-action start>
        <v-checkbox-btn @change="check" />
      </v-list-item-action>
    </template>
    <template v-slot:title>
      <v-combobox
        ref="combobox"
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
        @keydown="keyDown"
      >
        <template v-slot:item="{ item, props }">
          <v-list-item v-bind="props">
            <template v-slot:title>
              {{ item.title }}
            </template>
            <template v-slot:subtitle>
              <div style="text-align: end">
                前回: {{ item.raw.differenceInDaysLabel }} ({{
                  item.raw.dateLabel
                }})
              </div>
            </template>
          </v-list-item>
          <v-divider />
        </template>
      </v-combobox>
    </template>
    <template v-slot:subtitle>
      <div v-if="taskHistory != null" style="text-align: end">
        前回: {{ taskHistory.differenceInDaysLabel }} ({{
          taskHistory.dateLabel
        }})
      </div>
    </template>
  </v-list-item>
</template>
<script lang="ts" setup>
import { computed, toRefs, useTemplateRef, watch } from "vue";
import type { VCombobox } from "vuetify/components";
import { Task, useTask } from "../composables/Task";

interface TaskListItemProps {
  task: Task;
}
const combobox = useTemplateRef<VCombobox>("combobox");
const props = defineProps<TaskListItemProps>();
const { task } = toRefs(props);
const {
  completeTask: _completeTask,
  taskHistoryInfos,
  findTaskHistory,
  addBlankTask,
  newPopTaskId,
} = useTask();
watch(newPopTaskId, (v) => {
  if (task.value.taskId == v) {
    combobox.value?.focus();
    newPopTaskId.value = null;
  }
});
const taskHistory = computed(() => findTaskHistory(task.value.title));
const completed = computed(() => task.value.completed);

function check(e: InputEvent) {
  var checked: boolean = (e.target as any).checked;
  task.value.completed = checked;
}
function keyDown(e: KeyboardEvent) {
  if (e.code == "Enter") {
    addBlankTask(task.value.taskId);
  }
}
</script>

<style>
.v-field__append-inner {
  display: none;
}
.v-field__input {
  padding-top: 0;
}
</style>
