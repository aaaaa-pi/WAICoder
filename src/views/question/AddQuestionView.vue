<template>
  <div id="AddQuestionView">
    <a-drawer
      :visible="drawerVisible"
      @cancel="CloseDrawer"
      :width="880"
      :footer="false"
    >
      <template #title>
        <div>{{ id ? "更新题目" : "创建题目" }}</div>
      </template>
      <a-form :model="form">
        <a-form-item field="title" label="标题">
          <a-input
            v-model="form.title"
            placeholder="请输入标题"
            class="titleInput"
          />
        </a-form-item>
        <a-form-item field="tags" label="标签">
          <a-input-tag v-model="tags" placeholder="请选择标签" allow-clear />
        </a-form-item>
        <a-form-item field="extent" label="难度">
          <a-select v-model="extent" :style="{ width: '160px' }">
            <a-option>简单</a-option>
            <a-option>中等</a-option>
            <a-option>困难</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="content" label="题目内容">
          <MdEditor :value="form.content" :handle-change="onContentChange" />
        </a-form-item>
        <a-form-item field="answer" label="答案">
          <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
        </a-form-item>
        <a-divider orientation="center">
          <span class="dividerText">核心代码模式配置区域</span>
        </a-divider>
        <a-form-item field="templateCode" label="核心代码模板">
          <CodeEditor
            :value="templateForm.code"
            :language="templateForm.language"
            :handle-change="onTemplateFormChange"
            id="codeEditor"
          />
        </a-form-item>
        <a-form-item field="mergeCode" label="合并代码">
          <CodeEditor
            :value="mergeCodeForm.code"
            :language="mergeCodeForm.language"
            :handle-change="onMergeCodeFormChange"
            id="codeEditor"
          />
        </a-form-item>
        <a-divider />
        <a-form-item
          label="判题配置"
          :content-flex="false"
          :merge-props="false"
        >
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item field="judgeConfig.timeLimit" label="时间限制">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                placeholder="请输入时间限制"
                :min="minVal"
                size="large"
              />
              ms
            </a-form-item>
            <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                placeholder="请输入内存限制"
                :min="minVal"
                size="large"
              />
              KB
            </a-form-item>
            <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                placeholder="请输入堆栈限制"
                :min="minVal"
                size="large"
              />
              KB
            </a-form-item>
          </a-space>
        </a-form-item>
        <a-form-item
          label="判题用例配置"
          tooltip="判题用例的前两条将会作为 测试用例 展示"
          :content-flex="false"
          :merge-props="false"
        >
          <a-list>
            <a-list-item
              v-for="(judgeCaseItem, index) of form.judgeCase"
              :key="index"
            >
              <a-list-item-meta :title="`用例-${index}`"> </a-list-item-meta>
              <template #actions>
                <icon-edit @click="openModel(index)" />
                <icon-delete @click="handleDelete(index)" />
              </template>
              <a-modal v-model:visible="visible" @cancel="handleCancel">
                <a-space direction="vertical" style="min-width: 350px">
                  <a-form-item label="输入案例">
                    <a-input
                      v-model="value.newInput"
                      placeholder="请输入测试的输入用例"
                      size="large"
                    />
                  </a-form-item>
                  <a-form-item label="输出案例">
                    <a-input
                      v-model="value.newOutput"
                      placeholder="请输入测试的输出用例"
                      size="large"
                    />
                  </a-form-item>
                </a-space>
                <div class="button-box">
                  <a-button type="primary" @click="onConfirm">确认</a-button>
                </div>
              </a-modal>
            </a-list-item>
            <a-button
              @click="handleAdd"
              type="outline"
              status="success"
              class="addTest"
              >新增测试用例
            </a-button>
          </a-list>
        </a-form-item>
        <div style="margin-top: 16px" />
        <a-form-item>
          <a-button
            type="primary"
            style="min-width: 200px"
            @click="doSubmit"
            class="submit"
            >提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { defaultTemplateCode, defaultMergeCode } from "@/config/codeDefault";
import { Message } from "@arco-design/web-vue";
import { QuestionControllerService } from "../../../generated";
import { ref, computed, onMounted, reactive, watch, toRef } from "vue";
import { useStore } from "vuex";
/**
 *  定义组件属性类型
 */
interface Props {
  questionId: string;
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  questionId: () => "",
});
const id = ref();
watch(toRef(props, "questionId"), (newId) => {
  id.value = newId;
  loadData();
});
const store = useStore();
const extent = ref("简单");
const tags = ref();
let form = ref();
const templateForm = ref({
  language: "java",
  code: defaultTemplateCode,
});
const mergeCodeForm = ref({
  language: "java",
  code: defaultMergeCode,
});
const value = reactive({
  oldInput: "",
  newInput: "",
  oldOutput: "",
  newOutput: "",
});

const visible = ref(false);
// const drawerVisible = ref(false);
const minVal = 0;
const currentIndex = ref();

// 获取创建题目抽屉显示状态
const drawerVisible = computed(() => store.state.questionDrawer.drawerVisible);
/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  reset();
  if (!id.value) {
    return;
  }
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    id.value as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      const judgeConfig = form.value.judgeConfig;
      judgeConfig.memoryLimit = Number(judgeConfig.memoryLimit);
      judgeConfig.stackLimit = Number(judgeConfig.stackLimit);
      judgeConfig.timeLimit = Number(judgeConfig.timeLimit);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      extent.value = form.value.tags.shift() as any;
      tags.value = form.value.tags;
    }
  } else {
    Message.error("加载失败" + res.message);
  }
};

const reset = () => {
  form.value = {
    title: "",
    tags: [] as string[],
    answer: "",
    content: "",
    judgeConfig: {
      memoryLimit: 1000,
      stackLimit: 1000,
      timeLimit: 1000,
    },
    judgeCase: [
      {
        input: "",
        output: "",
      },
    ],
  };
  tags.value = [];
};

onMounted(() => {
  loadData();
});

const inputCase = computed({
  get() {
    return form.value.judgeCase[currentIndex.value]?.input;
  },
  set(value) {
    form.value.judgeCase[currentIndex.value].input = value;
  },
});
const outputCase = computed({
  get() {
    return form.value.judgeCase[currentIndex.value]?.output;
  },
  set(value) {
    form.value.judgeCase[currentIndex.value].output = value;
  },
});

const onContentChange = (value: string) => {
  form.value.content = value;
};
const onAnswerChange = (value: string) => {
  form.value.answer = value;
};

const onTemplateFormChange = (v: string) => {
  templateForm.value.code = v;
};
const onMergeCodeFormChange = (v: string) => {
  mergeCodeForm.value.code = v;
};

const handleTags = () => {
  return [extent.value, ...tags.value].filter((v) => v);
};

const CloseDrawer = () => {
  store.commit("questionDrawer/showDrawerVisible", false);
};
/**
 * 判题用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
const resetValue = () => {
  value.newInput = value.oldInput;
  value.newOutput = value.oldOutput;
};
/**
 * 判题用例弹框
 */
const openModel = (index: number) => {
  visible.value = true;
  currentIndex.value = index;
  value.oldInput = inputCase.value;
  value.oldOutput = outputCase.value;
  // 重置新值
  resetValue();
};
const handleCancel = () => {
  resetValue();
  inputCase.value = value.oldInput;
  outputCase.value = value.oldInput;
  visible.value = false;
};
const onConfirm = () => {
  inputCase.value = value.newInput;
  outputCase.value = value.newOutput;
  visible.value = false;
};

const doSubmit = async () => {
  form.value.tags = handleTags();
  if (id.value) {
    const res = await QuestionControllerService.updateQuestionUsingPost({
      ...form.value,
      templateCode: templateForm.value.code,
      mergeCode: mergeCodeForm.value.code,
    });
    if (res.code === 0) {
      Message.success("更新成功");
    } else {
      Message.error("更新失败" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost({
      ...form.value,
      templateCode: templateForm.value.code,
      mergeCode: mergeCodeForm.value.code,
    });
    if (res.code === 0) {
      Message.success("创建成功");
    } else {
      Message.error("创建失败" + res.message);
    }
  }
  store.commit("questionDrawer/showDrawerVisible", false);
  window.location.reload();
};
</script>

<style scoped>
#AddQuestionView {
  max-width: 880px;
  margin: auto;
}
#codeEditor {
  /* flex: 1 1 0%;
  overflow: hidden; */
  height: 200px;
  width: 100%;
}
.titleInput {
  width: 100%;
}
.arco-input-tag {
  width: 100%;
}
.arco-input-number {
  margin-right: 12px;
}
.addTest {
  width: 100%;
}
.submit {
  margin-left: auto;
}
:deep(
    .arco-list-medium
      .arco-list-content-wrapper
      .arco-list-content
      > .arco-list-item
  ) {
  padding: 5px 15px;
}

.button-box {
  display: flex;
  justify-content: end;
}
.dividerText {
  font-size: 10px;
  color: gray;
}
</style>
