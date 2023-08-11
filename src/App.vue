<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import { onMounted } from "vue";

/**
 *  全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("hello world");
};

onMounted(() => {
  doInit();
});
</script>
<style></style>
