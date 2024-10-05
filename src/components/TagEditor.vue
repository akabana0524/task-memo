<template>
  <div>
    <v-chip :color="tag.color" variant="flat">
      <input type="text" v-model="tag.name" />
    </v-chip>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-palette" variant="flat" />
      </template>
      <v-color-picker v-model="tag.color" />
    </v-menu>
    <v-btn @click="_deleteTag" icon="mdi-trash-can" variant="flat" />
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";
import { Tag, useTag } from "../composables/Tag";

interface TagEditorProps {
  tag: Tag;
}

const props = defineProps<TagEditorProps>();
const { tag } = toRefs(props);
const { deleteTag } = useTag();
function _deleteTag() {
  deleteTag(tag.value.id);
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
