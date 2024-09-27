import { computed, ref, watch } from "vue";

const theme = ref("dark");
watch(theme, (v) => localStorage.setItem("theme", v));
export function useTheme() {
  function loadTheme() {
    theme.value = localStorage.getItem("theme") ?? "dark";
  }
  function swapTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }
  const themeIcon = computed(() =>
    theme.value == "light" ? "mdi-weather-sunny" : "mdi-weather-night"
  );
  return { loadTheme, swapTheme, theme, themeIcon };
}
