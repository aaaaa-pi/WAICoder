<template>
  <a-card class="problemSolve">
    <div class="header">
      <icon-close class="closeIcon" />
    </div>
    <div class="main">
      <a-scrollbar style="height: calc(100vh - 120px); overflow: auto">
      </a-scrollbar>
    </div>
  </a-card>
</template>

<script setup lang="ts"></script>

<style scoped>
:deep(.arco-card-body) {
  padding: 8px 16px;
}
.problemSolve {
  height: 100%;
}
.header {
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.closeIcon {
  color: gray;
  cursor: pointer;
}
</style>
