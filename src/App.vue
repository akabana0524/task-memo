<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar :elevation="2" density="compact">
        <v-app-bar-title>Task Memo</v-app-bar-title>
        <v-spacer />
        <v-btn @click="addSample"></v-btn>
        <FirebaseGoogleAuth />
        <v-btn v-if="moveTaskModeFlag" icon color="primary" @click="deactivateMoveTaskMode">
          <v-icon icon="mdi-check" />
        </v-btn>
        <v-btn icon>
          <v-icon icon="mdi-dots-vertical" />
          <v-menu activator="parent">
            <v-list>
              <v-list-item title="チェック済みタスクを削除" prepend-icon="mdi-trash-can" base-color="success"
                @click="removeCompletedTasks" />
              <v-divider />
              <v-list-item title="タスク入れ替えモード" prepend-icon="mdi-swap-vertical" base-color="success"
                @click="activateMoveTaskMode" />
              <v-list-item title="空欄タスクを削除" prepend-icon="mdi-vanish" base-color="success" @click="removeEmptyTasks" />
              <v-divider />
              <v-list-item title="全タスクを削除" prepend-icon="mdi-trash-can" base-color="red" @click="removeAllTasks" />
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
import FirebaseGoogleAuth from "./components/FirebaseGoogleAuth.vue";
import { useBackup } from "./composables/Backup";
import { useTag } from "./composables/Tag";
import { useTask } from "./composables/Task";
import { useTheme } from "./composables/Theme";
import { useSample} from './composables/Sample';
import { useWorkspace } from "./composables/Workspace";

const { loadTags } = useTag();
const {
  loadTasks,
  removeCompletedTasks,
  removeAllTasks,
  removeEmptyTasks,
  activateMoveTaskMode,
  deactivateMoveTaskMode,
  moveTaskModeFlag,
} = useTask();
const { createBackup, loadBackups } =
  useBackup();
const { loadTheme, theme } = useTheme();

loadTags();
loadTasks();
loadTheme();
loadBackups();
createBackup();
const {addSample} = useSample();
const {} = useWorkspace();
</script>
