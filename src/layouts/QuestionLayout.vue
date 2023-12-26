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
import QuestionHeader from "@/components/header/QuestionHeader.vue";
</script>

<style scoped>
#questionLayout {
  display: flex;
  flex-direction: column;
  min-width: 360px;
  height: 100vh;
}

#questionLayout .header {
  background-color: var(--color-bg-3);
}

#questionLayout .content {
  flex: 1;
  background-color: var(--color-bg-1);
  padding: 10px 10px 0 10px;
  height: calc(100vh - 50px);
}

:deep(.arco-table-th) {
  background-color: #0a65cc;
  color: #fff;
}
:deep(.arco-table-container) {
  border-bottom: 4px solid #0a65cc;
  padding-bottom: 10px;
}

@media screen and (min-width: 768px) {
  #questionLayout {
    width: 100vw;
  }
}
@media screen and (max-width: 768px) {
  #questionLayout {
    max-width: 1000px;
  }
}
</style>
