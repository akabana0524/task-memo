<template>
  <v-chip
    :color="tag.color"
    variant="flat"
    closable
    @click:close="_removeTaskTag"
  >
    {{ tag.name }}
  </v-chip>
</template>
<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { TagId, useTag } from "../composables/Tag";
import { TaskId, useTask } from "../composables/Task";

interface TagProps {
  taskId: TaskId;
  tagId: TagId;
}

const props = defineProps<TagProps>();
const { taskId, tagId } = toRefs(props);
const { tags } = useTag();
const { removeTaskTag } = useTask();
const tag = computed(() => tags.value.find((v) => v.id == tagId.value)!);

function _removeTaskTag() {
  removeTaskTag(taskId.value, tagId.value);
}
</script>
