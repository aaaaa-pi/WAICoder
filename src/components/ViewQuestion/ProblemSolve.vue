<template>
  <a-card class="problemSolve">
    <div class="header">
      <icon-close class="closeIcon" />
    </div>
    <div class="main">
      <div class="title"></div>
      <MdViewer :value="answer || ''" />
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { IconClose } from "@arco-design/web-vue/es/icon";
import MdViewer from "@/components/MdViewer.vue";
interface Props {
  answer: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

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
