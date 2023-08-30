<template>
  <div class="info"></div>
</template>

<script setup>
import { IconUser } from "@arco-design/web-vue/es/icon";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();

// 获取相关信息
const loginUser = computed(() => store.state.user.loginUser);
console.log(loginUser);
</script>

<style scoped></style>
