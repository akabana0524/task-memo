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
              <v-list-item title="設定" prepend-icon="mdi-cog">
                <ConfigView />
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-app-bar>
      <v-main>
        <MainView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script lang="ts" setup>
import ConfigView from "./components/ConfigView.vue";
import MainView from "./components/MainView.vue";
import { useTag } from "./composables/Tag";
import { useTask } from "./composables/Task";
import { useTheme } from "./composables/Theme";

const { loadTags } = useTag();
const { loadTasks, removeCompletedTasks, removeAllTasks } = useTask();
const { loadTheme, theme } = useTheme();

loadTags();
loadTasks();
loadTheme();
</script>
