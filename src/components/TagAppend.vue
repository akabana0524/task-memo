<template>
  <v-chip :color="tag.color" variant="flat" @click="_addTaskTag">
    {{ tag.name }}
  </v-chip>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { TagId, useTag } from "../composables/Tag";
import { TaskId, useTask } from "../composables/Task";

interface TagAppendProps {
  taskId: TaskId;
  tagId: TagId;
}

const props = defineProps<TagAppendProps>();
const { taskId, tagId } = toRefs(props);
const { tags } = useTag();
const { addTaskTag } = useTask();
const tag = computed(() => tags.value.find((v) => v.id == tagId.value)!);

function _addTaskTag() {
  addTaskTag(taskId.value, tagId.value);
}
</script>
