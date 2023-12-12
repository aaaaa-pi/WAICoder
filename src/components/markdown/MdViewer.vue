<template>
  <Viewer :value="value" :locale="zhHans" :plugins="plugins" />
</template>

<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import "@/constant/MarkDownThemes/cyanosis.css";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import zhHans from "@/config/zh_Hans.json";
import { computed, onMounted, watch } from "vue";
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
const changeTheme = (theme: string) => {
  const markdownBody = document.querySelectorAll(".markdown-body");
  console.log(markdownBody);

  if (theme === "dark") {
    markdownBody.forEach((item: Element) => {
      item.classList.add("__dark");
    });
  } else {
    markdownBody.forEach((item: Element) => {
      item.classList.remove("__dark");
    });
  }
};
onMounted(() => {
  changeTheme(theme.value);
});

watch(
  () => theme.value,
  async () => {
    await changeTheme(theme.value);
  }
);
</script>

<style scoped></style>
