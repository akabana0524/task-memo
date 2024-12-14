<template>
  <v-list-item :base-color="completed ? 'success' : ''">
    <template v-slot:prepend>
      <v-list-item-action start>
        <v-checkbox-btn v-model="_check" />
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
          <TaskHistory
            v-bind="props"
            :taskHistoryInfo="item.raw"
            @click="clickHistory"
          />
          <v-divider />
        </template>
      </v-combobox>
      <div>
        <TaskTag
          v-for="tagId in task.tagIds"
          :key="tagId"
          :task-id="task.taskId"
          :tag-id="tagId"
        />
      </div>
    </template>
    <template v-slot:subtitle>
      <div v-if="taskHistory != null" style="text-align: end">
        前回: {{ taskHistory.differenceInDaysLabel }} ({{
          taskHistory.dateLabel
        }})
      </div>
    </template>
    <template v-slot:append>
      <div v-if="moveTaskModeFlag">
        <v-btn
          icon
          :disabled="!canMoveTask(task.taskId, -1)"
          @click="() => moveTask(task.taskId, -1)"
        >
          <v-icon icon="mdi-arrow-up" />
        </v-btn>
        <v-btn
          icon
          :disabled="!canMoveTask(task.taskId, 1)"
          @click="() => moveTask(task.taskId, 1)"
        >
          <v-icon icon="mdi-arrow-down" />
        </v-btn>
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-tag" />
        </template>
        <TagAppendList :task-id="task.taskId" :ignore-tag-ids="task.tagIds" />
      </v-menu>
    </template>
  </v-list-item>
</template>
<script lang="ts" setup>
import { computed, nextTick, toRefs, useTemplateRef, watch } from "vue";
import type { VCombobox } from "vuetify/components";
import { Task, useTask } from "../composables/Task";
import TagAppendList from "./TagAppendList.vue";
import TaskHistory from "./TaskHistory.vue";
import TaskTag from "./TaskTag.vue";

interface TaskListItemProps {
  task: Task;
}
const combobox = useTemplateRef<VCombobox>("combobox");
const props = defineProps<TaskListItemProps>();
const { task } = toRefs(props);
const {
  changeCompleteTask,
  taskHistoryInfos,
  findTaskHistory,
  addBlankTask,
  newPopTaskId,
  setTaskTagIds,
  moveTaskModeFlag,
  canMoveTask,
  moveTask,
} = useTask();
watch(newPopTaskId, (v) => {
  if (task.value.taskId == v) {
    combobox.value?.focus();
    newPopTaskId.value = null;
  }
});
const taskHistory = computed(() => findTaskHistory(task.value.title));
const completed = computed(() => task.value.completed);
const _check = computed<boolean>({
  get: () => task.value.completed,
  set: (v) => changeCompleteTask(task.value.taskId, v),
});
function keyDown(e: KeyboardEvent) {
  if (!e.isComposing && e.key == "Enter") {
    addBlankTask(task.value.taskCategoryId, task.value.taskId);
  }
}
function clickHistory() {
  nextTick(() => {
    setTaskTagIds(task.value.taskId, taskHistory.value!.tagIds);
  });
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
