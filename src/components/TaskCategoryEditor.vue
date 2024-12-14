<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="taskCategory.taskCategoryName"
          clearable
          hide-details="auto"
        />
      </v-col>
      <v-col cols="auto">
        <v-btn
          icon
          variant="flat"
          :disabled="!canMoveTaskCategory(taskCategory.taskCategoryId, -1)"
          @click="() => moveTaskCategory(taskCategory.taskCategoryId, -1)"
        >
          <v-icon icon="mdi-arrow-up" />
        </v-btn>
        <v-btn
          icon
          variant="flat"
          :disabled="!canMoveTaskCategory(taskCategory.taskCategoryId, 1)"
          @click="() => moveTaskCategory(taskCategory.taskCategoryId, 1)"
        >
          <v-icon icon="mdi-arrow-down" />
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-palette" variant="flat" />
          </template>
          <v-color-picker v-model="taskCategory.taskCategoryColor" />
        </v-menu>
        <v-btn
          @click="_deleteTaskCategory"
          icon="mdi-trash-can"
          variant="flat"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";
import { TaskCategory, useTask } from "../composables/Task";

interface TaskCategoryEditorProps {
  taskCategory: TaskCategory;
}

const props = defineProps<TaskCategoryEditorProps>();
const { taskCategory } = toRefs(props);
const { deleteTaskCategory, canMoveTaskCategory, moveTaskCategory } = useTask();
function _deleteTaskCategory() {
  deleteTaskCategory(taskCategory.value.taskCategoryId);
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
