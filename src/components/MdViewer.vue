<template>
  <Viewer :value="value" :locale="zhHans" :plugins="plugins" />
</template>

<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import "juejin-markdown-themes/dist/cyanosis.css";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "highlight.js/styles/docco.css";
import zhHans from "../config/zh_Hans.json";

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
</script>

<style scoped></style>
