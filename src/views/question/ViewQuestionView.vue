<template>
  <div id="ViewQuestionView"></div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { QuestionControllerService, QuestionVO } from "../../../generated";
import { ref, watchEffect, onMounted } from "vue";

const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    Message.error("加载失败" + res.message);
  }
};
/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
#ViewQuestionView {
}
</style>
