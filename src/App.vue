<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar :elevation="2" density="compact">
        <v-app-bar-title>Task Memo</v-app-bar-title>
        <v-spacer />
        <v-btn icon>
          <v-icon icon="mdi-dots-vertical" />
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                title="チェック済みを削除"
                prepend-icon="mdi-trash-can"
                base-color="success"
                @click="removeCompletedTasks"
              />
              <v-list-item
                title="全項目を削除"
                prepend-icon="mdi-trash-can"
                base-color="red"
                @click="removeAllTasks"
              />
              <v-divider />
              <v-list-item
                title="テーマ切り替え"
                :prepend-icon="themeIcon"
                @click="swapTheme"
              />
              <v-divider />
              <v-list-item
                title="全データ削除"
                prepend-icon="mdi-skull-crossbones"
                @click="reset"
              />
            </v-list>
          </v-menu>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-card>
          <v-tabs v-model="tab">
            <v-tab value="main">
              <v-icon icon="mdi-format-list-checkbox" />
            </v-tab>
            <v-tab value="tags">
              <v-icon icon="mdi-tag" />
            </v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="main">
                <TaskList />
              </v-tabs-window-item>
              <v-tabs-window-item value="tags">
                <TagEditorList />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TagEditorList from "./components/TagEditorList.vue";
import TaskList from "./components/TaskList.vue";
import { useTag } from "./composables/Tag";
import { useTask } from "./composables/Task";
import { useTheme } from "./composables/Theme";

const { loadTags } = useTag();
const { loadTasks, removeCompletedTasks, removeAllTasks } = useTask();
const { loadTheme, swapTheme, theme, themeIcon } = useTheme();

loadTags();
loadTasks();
loadTheme();

const tab = ref("");

function reset() {
  localStorage.clear();
  location.reload();
}
</script>
