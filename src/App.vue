<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar :elevation="2" density="compact">
        <v-app-bar-title>Task Memo</v-app-bar-title>
        <v-spacer></v-spacer>
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
        <v-fab
          color="cyan"
          icon="mdi-plus"
          location="bottom end"
          size="64"
          absolute
          app
          @click="addRandomTask"
        >
          <v-dialog activator="parent" v-model="inputFormActive">
            <v-card>
              <template v-slot:actions>
                <v-btn class="ml-auto" text="追加" @click="confirm"></v-btn>
              </template>
            </v-card>
          </v-dialog>
        </v-fab>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import TaskList from "./components/TaskList.vue";
import { useTask } from "./composables/Task";

const { addTask, loadTasks } = useTask();
loadTasks();

function addRandomTask() {
  addTask({ title: new Date().toISOString() });
}
function swapTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
var themeString = localStorage.getItem("theme") ?? "dark";
const theme = ref(themeString);
watch(theme, (v) => localStorage.setItem("theme", v));
const themeIcon = computed(() =>
  theme.value == "light" ? "mdi-weather-sunny" : "mdi-weather-night"
);

const inputFormActive = ref(false);
function confirm() {
  inputFormActive.value = false;
  addRandomTask();
}
</script>
