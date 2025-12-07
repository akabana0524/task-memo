<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    fullscreen
    activator="parent"
  >
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
      </v-toolbar>
      <div>
        <v-tabs v-model="tab" color="primary">
          <v-tab value="tags">
            <v-icon icon="mdi-tag" />
          </v-tab>
          <v-tab value="taskCategories">
            <v-icon icon="mdi-tab" />
          </v-tab>
          <v-tab value="ui">
            <v-icon icon="mdi-eye" />
          </v-tab>
          <v-tab value="backups">
            <v-icon icon="mdi-history" />
          </v-tab>
          <v-tab value="data">
            <v-icon icon="mdi-database-export-outline" />
          </v-tab>
          <v-tab value="reset">
            <v-icon icon="mdi-trash-can" />
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="tags">
            <v-card>
              <TagEditorList />
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="taskCategories">
            <v-card>
              <TaskCategoryEditorList />
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="backups">
            <v-card>
              <BackupList/>
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="ui">
            <v-card>
              <v-btn
                :prepend-icon="themeIcon"
                @click="swapTheme"
                text="テーマ切り替え"
              />
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="data">
            <v-card>
              <v-list>
                <v-list-item>
                  <v-btn
                    prepend-icon="mdi-export"
                    @click="handleExport"
                    text="データをエクスポート"
                    block
                  />
                </v-list-item>
                <v-list-item>
                  <v-btn
                    prepend-icon="mdi-import"
                    @click="triggerFileInput"
                    text="データをインポート"
                    block
                  />
                  <input
                    ref="fileInput"
                    type="file"
                    accept="application/json"
                    @change="handleImport"
                    style="display: none"
                  />
                </v-list-item>
              </v-list>
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="reset">
            <v-card>
              <v-btn
                color="danger"
                prepend-icon="mdi-skull-crossbones"
                @click="reset"
                text="全データ削除"
              />
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "../composables/Theme";
import { useDataExport } from "../composables/DataPortability";
import TagEditorList from "./TagEditorList.vue";
import TaskCategoryEditorList from "./TaskCategoryEditorList.vue";
import BackupList from "./BackupList.vue";
const { swapTheme, themeIcon } = useTheme();
const { exportAllData, importAllData } = useDataExport();
const dialog = ref(false);
const tab = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

function reset() {
  localStorage.clear();
  location.reload();
}

function handleExport() {
  exportAllData();
}

function triggerFileInput() {
  fileInput.value?.click();
}

async function handleImport(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    try {
      await importAllData(file);
    } catch (error) {
      console.error('Import error:', error);
    }
  }
}
</script>
