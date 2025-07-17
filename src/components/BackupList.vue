<template>
  <v-slide-x-transition class="py-0" tag="v-list" group>
    <template v-for="backup in backups" :key="backup.revision">
        <div @click="() => restoreBackup(backup.revision)">
      <div>revision:{{ backup.revision }}</div>
      <div>日時:{{ new Date(backup.date).toLocaleString() }}</div>
      <v-divider />
      </div>
    </template>
  </v-slide-x-transition>
</template>

<script lang="ts" setup>
import { useBackup } from "../composables/Backup";
const { backups, restoreBackup } = useBackup();
</script>
