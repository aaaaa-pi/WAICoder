<template>
  <div id="questionLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <QuestionHeader />
      </a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import QuestionHeader from "@/components/QuestionHeader.vue";
</script>

<style scoped>
#questionLayout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

#questionLayout .content {
  flex: 1;
  /* background: rgb(240 240 240); */
  padding: 10px 20px;
  margin-bottom: 16px;
  height: calc(100vh - 50px);
}
</style>
