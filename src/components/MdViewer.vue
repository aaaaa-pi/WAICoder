<template>
  <Viewer :value="value" :locale="zhHans" :plugins="plugins" />
</template>

<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import "@/constant/MarkDownThemes/cyanosis.css";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "highlight.js/styles/docco.css";
import zhHans from "../config/zh_Hans.json";
import { computed, onMounted, watch, onUpdated } from "vue";
import { useStore } from "vuex";
const store = useStore();
const theme = computed(() => store.state.theme.theme);

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}
const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});

// 改变markdownTheme的主题
const changeTheme = async (theme: string) => {
  const markdownBody = document.querySelector(".markdown-body");
  if (theme === "dark") {
    markdownBody?.classList.add("__dark");
  } else {
    markdownBody?.classList.remove("__dark");
  }
};
onMounted(async () => {
  await changeTheme(theme.value);
});
watch(
  () => theme.value,
  async () => {
    await changeTheme(theme.value);
  }
);
</script>

<style scoped></style>
