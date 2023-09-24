<template>
  <div id="ViewQuestionView">
    <a-resize-box
      :directions="['right']"
      style="min-width: 335px; width: 50vw"
      v-model:width="resizeBoxWidth"
    >
      <div id="description">
        <a-spin dot :loading="isload" style="width: 100%">
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
        </a-spin>
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
      <div id="CollapsePanels">
        <a-card>
          <div class="container" v-show="isShow">
            <a-spin
              :loading="waitting"
              style="width: 100%"
              tip="运行中，请稍后..."
            >
              <div v-if="resultData.result">
                <p
                  v-if="resultData.result === '成功'"
                  :style="{ color: 'green' }"
                  class="result"
                >
                  {{ resultData.result }}
                </p>
                <p v-else :style="{ color: 'red' }" class="result">
                  {{ resultData.result }}
                </p>
                <p class="info">执行用时：{{ resultData.time }}ms</p>
                <p class="info">运行内存：{{ resultData.memory }}KB</p>
                <div class="message">
                  <p class="label">message</p>
                  <div class="messageBox">{{ resultData.message }}</div>
                </div>
              </div>
              <div v-else style="padding-top: 12px">
                <p
                  :style="{
                    textAlign: 'center',
                    color: '#3c3c4399',
                  }"
                >
                  请先执行代码
                </p>
              </div>
            </a-spin>
          </div>
          <div class="title">
            <a-button @click="changeShow" type="text" size="mini">
              控制台
              <span class="btn-icon">
                <icon-down v-if="isShow" />
                <icon-up v-else />
              </span>
            </a-button>
            <a-button type="primary" size="mini" @click="doSubmit">
              运行
            </a-button>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";
import {
  QuestionControllerService,
  QuestionVO,
  QuestionSubmitAddRequest,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { ref, onMounted, watchEffect, watch } from "vue";
const question = ref<QuestionVO>();
const codeLanguages = ref(["java", "cpp", "go", "javascript", "typescript"]);
const resizeBoxWidth = ref(600);
const codeWidth = ref(0);
const route = useRoute();
const isload = ref(false);
const isShow = ref(false);
const waitting = ref(false);
const resultData = ref({
  result: "",
  message: "",
  time: 0,
  memory: 0,
});
watchEffect(() => {
  codeWidth.value = window.innerWidth - resizeBoxWidth.value - 60;
});
watch(route, () => {
  id.value = route.params.id as string;
  loadData();
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

const id = ref<string>(props.id);

const onCodeChange = (v: string) => {
  form.value.code = v;
};

const changeShow = () => {
  isShow.value = !isShow.value;
};

const loadData = async () => {
  isload.value = true;
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    id.value as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    Message.error("加载失败" + res.message);
  }
  isload.value = false;
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  isShow.value = true;
  waitting.value = true;
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    Message.success("提交成功");
    resultData.value = res.data;
  } else {
    Message.error("提交失败" + res.message);
    resultData.value = res.data;
    // resultData.value.result = "提交失败";
    // resultData.value.message = res.message;
  }
  waitting.value = false;
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
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

#CollapsePanels {
  margin-top: 10px;
  width: 100%;
}
:deep(#CollapsePanels .arco-card-size-medium .arco-card-body) {
  padding: 0;
}
.title {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  bottom: 50px;
  padding: 0 12px 16px 12px;
  border-bottom: 1px solid #efefef;
}
.btn-icon {
  margin-left: 4px;
}
.result {
  font-size: 18px;
  margin-bottom: 0px;
}
.info {
  display: inline-block;
  font-size: 8px;
  margin-right: 10px;
}
.label {
  margin: 4px 0 8px 4px;
  font-size: 12px;
  color: #3c3c4399;
}
.messageBox {
  background: #000a200d;
  padding: 12px;
}
</style>
