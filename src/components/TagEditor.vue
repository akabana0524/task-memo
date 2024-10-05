<template>
  <v-chip :color="tag.color" variant="flat">
    <template v-slot:default>
      <input type="text" v-model="tag.name" />
    </template>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-palette" />
        </template>
        <v-color-picker v-model="tag.color" />
      </v-menu>
      <v-btn @click="_deleteTag" icon="mdi-trash-can" />
    </template>
  </v-chip>
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
