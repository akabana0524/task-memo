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
          <v-tabs-window-item value="ui">
            <v-card>
              <v-btn
                :prepend-icon="themeIcon"
                @click="swapTheme"
                text="テーマ切り替え"
              />
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
import TagEditorList from "./TagEditorList.vue";
import TaskCategoryEditorList from "./TaskCategoryEditorList.vue";
const { swapTheme, themeIcon } = useTheme();
const dialog = ref(false);
const tab = ref("");

function reset() {
  localStorage.clear();
  location.reload();
}
</script>
