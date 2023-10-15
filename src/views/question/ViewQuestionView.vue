<template>
  <div id="ViewQuestionView">
    <a-resize-box
      :directions="['right']"
      style="min-width: 335px; width: 50vw"
      v-model:width="resizeBoxWidth"
    >
      <div id="description">
        <a-spin dot :loading="isload" style="width: 100%">
          <a-tabs
            v-model:activeKey="activeKey"
            default-active-key="question"
            size="mini"
          >
            <a-tab-pane key="question" title="题目">
              <a-scrollbar style="height: calc(100vh - 120px); overflow: auto">
                <a-card v-if="question" :title="question.title">
                  <a-space wrap>
                    <span class="descTangName">标签：</span>
                    <a-tag v-for="(tag, index) of question.tags" :key="index"
                      >{{ tag }}
                    </a-tag>
                  </a-space>
                  <div class="submitRecord">
                    <a-descriptions
                      :style="{ marginBottom: '10px', paddingLeft: '6px' }"
                      size="mini"
                      :column="{ xs: 1, md: 2, lg: 3 }"
                    >
                      <a-descriptions-item label="通过次数:">
                        <span class="recordTxt">
                          {{ question.acceptedNum }}
                        </span>
                      </a-descriptions-item>
                      <a-descriptions-item label="提交次数:">
                        <span class="recordTxt">{{ question.submitNum }}</span>
                      </a-descriptions-item>
                      <a-descriptions-item label="通过率:">
                        <span class="recordTxt">{{ question.passRate }}</span>
                      </a-descriptions-item>
                    </a-descriptions>
                  </div>
                  <MdViewer :value="question.content || ''" />
                  <a-descriptions
                    style="margin-top: 20px"
                    size="small"
                    :column="{ xs: 1, md: 2, lg: 3 }"
                  >
                    <a-descriptions-item label="时间限制">
                      <a-tag>
                        {{ question.judgeConfig?.timeLimit ?? 0 }}ms
                      </a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="内存限制">
                      <a-tag>
                        {{ question.judgeConfig?.memoryLimit ?? 0 }}KB
                      </a-tag>
                    </a-descriptions-item>
                    <a-descriptions-item label="堆栈限制">
                      <a-tag>
                        {{ question.judgeConfig?.stackLimit ?? 0 }}KB
                      </a-tag>
                    </a-descriptions-item>
                  </a-descriptions>
                </a-card>
              </a-scrollbar>
            </a-tab-pane>
            <a-tab-pane key="comment" title="评论" disabled>评论区</a-tab-pane>
            <a-tab-pane key="answer" title="题解">暂时无法查看答案</a-tab-pane>
            <a-tab-pane key="submit" title="提交记录">
              <a-scrollbar style="height: calc(100vh - 120px); overflow: auto">
                <a-card>
                  <a-table
                    :columns="columns"
                    :data="submitDataList"
                    @row-click="recordDetail"
                    :pagination="{
                      showTotal: true,
                      pageSize: searchParams.pageSize,
                      current: searchParams.current,
                      total,
                    }"
                    @page-change="onPageChange"
                    :bordered="{ wrapper: true, cell: true }"
                    stripe
                  >
                    <template #result="{ record }">
                      <a-tag
                        v-if="record.judgeInfo.result === '成功'"
                        color="green"
                        bordered
                      >
                        {{ record.judgeInfo.result }}
                      </a-tag>
                      <a-tag
                        v-else-if="record.judgeInfo.result === '等待中'"
                        color="gray"
                        bordered
                      >
                        {{ record.judgeInfo.result }}
                      </a-tag>
                      <a-tag
                        v-else-if="record.judgeInfo.result === '编译错误'"
                        color="blue"
                        bordered
                      >
                        {{ record.judgeInfo.result }}
                      </a-tag>
                      <a-tag v-else color="red" bordered>
                        {{ record.judgeInfo.result }}
                      </a-tag>
                    </template>
                    <template #time="{ record }">
                      <p class="runInfo" v-if="record.judgeInfo.time">
                        {{ record.judgeInfo.time }}ms
                      </p>
                      <p class="runInfo" v-else>N/A</p>
                    </template>
                    <template #memory="{ record }">
                      <p class="runInfo" v-if="record.judgeInfo.memory">
                        {{ record.judgeInfo.memory }}KB
                      </p>
                      <p class="runInfo" v-else>N/A</p>
                    </template>
                    <template #createTime="{ record }">
                      {{ moment(record.createTime).format("YYYY-MM-DD") }}
                    </template>
                  </a-table>
                </a-card>
              </a-scrollbar>
            </a-tab-pane>
          </a-tabs>
        </a-spin>
      </div>
    </a-resize-box>
    <div id="rightPart" :style="{ width: codeWidth + 'px' }">
      <div class="code" v-if="!isRecordShow">
        <a-form :model="form" layout="inline" size="mini" class="selectForm">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '160px' }"
              placeholder="选择编程语言"
            >
              <a-option v-for="language in codeLanguages" :key="language">
                {{ language }}
              </a-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-popover position="left">
              <a-button type="text">
                <span class="tips-dots"></span>
                <span style="color: #999">{{ codeModeTitle }}</span>
              </a-button>
              <template #content>
                <div class="tipsTitle">
                  {{ codeModeTitle }}
                  <span>
                    <icon-check-circle-fill
                      :style="{
                        fontSize: '12px',
                        color: '#065ACC',
                      }"
                    />
                  </span>
                </div>
                <div class="tipsDesc">
                  请通过代码实现题目，过程中的输入输出处理方式请参考
                  <a-link style="font-size: 12px" @click="openTips">
                    题目输入输出描述
                  </a-link>
                </div>
              </template>
            </a-popover>
            <div class="setting">
              <a-dropdown>
                <icon-settings
                  :style="{
                    fontSize: '16px',
                    color: '#000',
                  }"
                />
                <template #content>
                  <a-radio-group
                    v-model="codeMode"
                    direction="vertical"
                    size="mini"
                  >
                    <a-radio value="1" :default-checked="true">ACM模式</a-radio>
                    <a-radio value="2">核心代码模式</a-radio>
                  </a-radio-group>
                </template>
              </a-dropdown>
            </div>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="onCodeChange"
          id="codeEditor"
        />
        <a-resize-box
          :directions="['top']"
          :style="{ minHeight: minHeight + 'px', maxHeight: maxHeight + 'px' }"
          v-model:height="resizeBoxheight"
        >
          <CodeCollapsePanels
            :result-data="resultData"
            :do-submit="doSubmit"
            :waitting="waitting"
            :do-run="doRun"
            :resize-box-height="resizeBoxheight"
            :max-resize-box-height="maxHeight"
            ref="controlRef"
          />
        </a-resize-box>
      </div>
      <RecordDetail
        :record-content="recordData"
        :close-record="closeRecord"
        v-if="isRecordShow"
      />
    </div>
    <CodeTips :visible="isTipsShow" :colse-tips="colseTips" />
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  QuestionControllerService,
  QuestionVO,
  QuestionSubmitAddRequest,
  QuestionSubmitQueryRequest,
  LoginUserVO,
  QuestionSubmitVO,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import CodeTips from "@/components/CodeSetting/CodeTips.vue";
import CodeCollapsePanels from "@/components/CodeSetting/CodeCollapsePanels.vue";
import RecordDetail from "@/components/CodeSetting/RecordDetail.vue";
import MdViewer from "@/components/MdViewer.vue";
import { ref, onMounted, watchEffect, watch, computed } from "vue";
const question = ref<QuestionVO>();
const codeLanguages = ref(["java"]);
const resizeBoxWidth = ref(600);
const resizeBoxheight = ref(55);
const codeWidth = ref(0);
const route = useRoute();
const isload = ref(false);
const waitting = ref(false);
const submitDataList = ref([]);
const activeKey = ref("question");
const total = ref(0);
import moment from "moment";
const store = useStore();
const isTipsShow = ref(false);
const codeMode = ref("1");
const runInputList = ref<string[]>([]);
const isRecordShow = ref(false);
const recordData = ref<QuestionSubmitVO>({
  code: "",
});
const controlRef = ref<{ isShow: boolean }>();
const minHeight = ref(55);
const maxHeight = ref(800);

interface RunContent {
  input: string;
  runMode: number;
  activeKey: string;
}

// 获取相关信息
const loginUser = computed<LoginUserVO>(() => store.state.user.loginUser);
const resultData = ref({
  result: "",
  message: "",
  time: 0,
  memory: 0,
});
const searchParams = ref<QuestionSubmitQueryRequest>({
  status: undefined,
  userId: undefined,
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});
const columns = [
  {
    title: "状态",
    slotName: "result",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "执行时间",
    slotName: "time",
  },
  {
    title: "消耗内存",
    slotName: "memory",
  },
  {
    title: "时间",
    slotName: "createTime",
  },
];
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
watchEffect(() => {
  codeWidth.value = window.innerWidth - resizeBoxWidth.value - 60;
  maxHeight.value = window.innerHeight - 180;
});
watch(route, () => {
  id.value = route.params.id as string;
  loadData();
});
watch(activeKey, () => {
  loadData();
});
watch(
  () => controlRef.value?.isShow,
  () => {
    if (controlRef.value?.isShow) {
      minHeight.value = 144;
      resizeBoxheight.value = 144;
    } else {
      minHeight.value = 55;
      resizeBoxheight.value = 55;
    }
  }
);

const current = computed(() => searchParams.value.current);
watch(current, () => {
  loadData();
});
window.addEventListener("resize", () => {
  // 窗口大小改变时,手动触发更新
  codeWidth.value = window.innerWidth - resizeBoxWidth.value - 60;
  maxHeight.value = window.innerHeight - 180;
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

const codeModeTitle = computed(() =>
  codeMode.value === "1" ? "ACM模式" : "核心代码模式"
);

const openTips = () => {
  isTipsShow.value = true;
};

const colseTips = () => {
  isTipsShow.value = false;
};

const recordDetail = (rowData: any) => {
  recordData.value = rowData;
  isRecordShow.value = true;
};

const closeRecord = () => {
  isRecordShow.value = false;
};

const loadQuestionData = async () => {
  if (activeKey.value !== "question") {
    return;
  }
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

const loadSubmitData = async () => {
  if (activeKey.value !== "submit") {
    return;
  }
  isload.value = true;
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      questionId: id.value,
      userId: loginUser.value.id,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    submitDataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("加载题目提交列表失败" + res.message);
  }
  isload.value = false;
};

const loadData = () => {
  loadQuestionData();
  loadSubmitData();
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
  waitting.value = true;
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
    model: Number(codeMode.value),
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
 * 运行代码
 */
const doRun = async (runContent: RunContent) => {
  const result = computed(() => runContent.input.replace(/\n/g, ","));
  runInputList.value = result.value.split(",");
  if (!question.value?.id) {
    return;
  }
  runContent.activeKey = "2";
  waitting.value = true;
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
    model: runContent.runMode,
    inputList: runInputList.value,
  });
  if (res.code === 0) {
    resultData.value = res.data;
  } else {
    Message.error("运行失败: " + res.message);
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
  loadQuestionData();
  loadSubmitData();
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
#rightPart {
  height: calc(100vh - 70px);
  min-width: 335px;
  padding: 0 10px;
  width: 50vw;
}
#codeEditor {
  flex: 1 1 0%;
  overflow: hidden;
}
.code {
  display: flex;
  flex-direction: column;
  height: 100%;
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
:deep(.arco-radio-label) {
  margin-right: 8px;
}

.submitRecord {
  margin-top: 10px;
}

.descTangName {
  font-weight: 600;
  color: #005bb7;
  padding-left: 6px;
}

.recordTxt {
  font-weight: 600;
}

.runInfo {
  display: inline-block;
  margin: 0;
}

.selectForm {
  display: flex;
  justify-content: space-between;
}

.tips-dots {
  background: #2ecc71;
  border-radius: 50%;
  display: block;
  height: 4px;
  left: 6px;
  margin-right: 4px;
  top: 9px;
  width: 4px;
}
.tipsTitle {
  align-items: center;
  color: #222;
  font-size: 8px;
  line-height: 8px;
  font-weight: 400;
}

.tipsDesc {
  color: #999;
  font-size: 12px;
  line-height: 21px;
  margin-top: 4px;
}

.setting {
  padding: 5px;
  cursor: pointer;
}
.setting:hover {
  background-color: #000a200d;
}
</style>
