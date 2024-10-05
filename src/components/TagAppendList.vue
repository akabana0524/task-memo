<template>
  <v-card>
    <TagAppend
      v-for="tag in visibleTags"
      :key="tag.id"
      :task-id="taskId"
      :tag-id="tag.id"
    />
  </v-card>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { TagId, useTag } from "../composables/Tag";
import { TaskId } from "../composables/Task";
import TagAppend from "./TagAppend.vue";

interface TagAppendProps {
  taskId: TaskId;
  ignoreTagIds: TagId[];
}

const props = defineProps<TagAppendProps>();
const { taskId, ignoreTagIds } = toRefs(props);
const { tags } = useTag();

const visibleTags = computed(() =>
  tags.value.filter((v) => !ignoreTagIds.value.includes(v.id))
);
</script>
