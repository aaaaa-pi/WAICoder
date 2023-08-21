<template>
  <div id="ViewQuestionView">
    <a-resize-box
      :directions="['right']"
      style="min-width: 335px; width: 50vw"
      v-model:width="resizeBoxWidth"
    >
      <div id="description">
        <a-tabs default-active-key="question" size="mini">
          <a-tab-pane key="question" title="题目">
            <a-scrollbar style="height: calc(100vh - 120px); overflow: auto">
              <a-card v-if="question" :title="question.title">
                <a-descriptions
                  title="判题条件"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig?.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig?.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig?.stackLimit ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ''" />
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(tag, index) of question.tags"
                      :key="index"
                      color="green"
                      >{{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-scrollbar>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled>评论区</a-tab-pane>
          <a-tab-pane key="answer" title="题解">暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </div>
    </a-resize-box>
    <div id="code" :style="{ width: codeWidth + 'px' }">
      <a-form :model="form" layout="inline" size="mini">
        <a-form-item field="language" label="编程语言" style="min-width: 240px">
          <a-select
            v-model="form.language"
            :style="{ width: '320px' }"
            placeholder="选择编程语言"
          >
            <a-option v-for="language in codeLanguages" :key="language">
              {{ language }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
      <CodeEditor
        :value="form.code"
        :language="form.language"
        :handle-change="onCodeChange"
        id="codeEditor"
      />
      <a-collapse :default-active-key="[1]" style="margin-top: 10px">
        <a-collapse-item header="控制台" key="1">
          <template #extra>
            <a-button type="primary" @click="doSumbit" size="mini">
              运行
            </a-button>
          </template>
          <div>Beijing Toutiao Technology Co., Ltd.</div>
          <div>Beijing Toutiao Technology Co., Ltd.</div>
          <div>Beijing Toutiao Technology Co., Ltd.</div>
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </a-collapse-item>
      </a-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import {
  QuestionControllerService,
  QuestionVO,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { ref, onMounted, watchEffect } from "vue";
const question = ref<QuestionVO>();
const codeLanguages = ref(["java", "cpp", "go", "javascript", "typescript"]);
const resizeBoxWidth = ref(0);
const codeWidth = ref(0);
watchEffect(() => {
  codeWidth.value = window.innerWidth - resizeBoxWidth.value - 60;
});
window.addEventListener("resize", () => {
  // 窗口大小改变时,手动触发更新
  codeWidth.value = window.innerWidth - resizeBoxWidth.value - 60;
});
interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const onCodeChange = (v: string) => {
  form.value.code = v;
};

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

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSumbit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });

  if (res.code === 0) {
    Message.success("提交成功");
  } else {
    Message.error("提交失败" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style>
#ViewQuestionView {
  width: 100%;
  display: flex;
}

#ViewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

#description {
  margin-right: 10px;
}
#code {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  min-width: 335px;
  padding: 0 10px;
  width: 50vw;
}
#codeEditor {
  flex: 1 1 0%;
  overflow: hidden;
}
.arco-collapse-item-header {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
