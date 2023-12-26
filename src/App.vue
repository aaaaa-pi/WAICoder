<template>
  <div id="app">
    <a-spin :loading="loading" tip="加载中，请稍后...">
      <component :is="layout" />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const theme = ref();

const layout = computed(() => route.meta.layout);

// 获取loading
const loading = computed(() => store.state.loading.loading);

/**
 *  全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("全局初始化函数");
};

onMounted(() => {
  doInit();
  theme.value = localStorage.getItem("theme");
  if (theme.value === "dark") {
    store.commit("theme/toggleTheme", "dark");
  } else {
    store.commit("theme/toggleTheme", "light");
  }
});
</script>
<style>
#app {
  height: 100%;
  width: fit-content;
}
</style>
