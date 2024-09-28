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
                title="テーマ切り替え"
                :prepend-icon="themeIcon"
                @click="swapTheme"
              />
            </v-list>
          </v-menu>
        </v-btn>
      </v-app-bar>
      <v-main>
        <TaskList />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script lang="ts" setup>
import TaskList from "./components/TaskList.vue";
import { useTask } from "./composables/Task";
import { useTheme } from "./composables/Theme";

const { loadTasks } = useTask();
const { loadTheme, swapTheme, theme, themeIcon } = useTheme();

loadTasks();
loadTheme();
</script>
