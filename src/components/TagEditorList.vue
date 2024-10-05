<template>
  <div>
    <div v-for="tag in tags" :key="tag.id">
      <TagEditor :tag="tag" />
    </div>
    <div>
      <v-chip @click="addBlankTag">+</v-chip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTag } from "../composables/Tag";
import TagEditor from "./TagEditor.vue";

const { tags, addBlankTag } = useTag();
</script>
