<template>
  <div id="AddQuestionView">
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
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
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
        label="测试用例配置"
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
                    v-model="inputCase"
                    placeholder="请输入测试的输入用例"
                    size="large"
                  />
                </a-form-item>
                <a-form-item label="输出案例">
                  <a-input
                    v-model="outputCase"
                    placeholder="请输入测试的输出用例"
                    size="large"
                  />
                </a-form-item>
              </a-space>
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
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import { QuestionControllerService } from "../../../generated";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const updatePage = route.path.includes("update");
const extent = ref("简单");
const tags = ref();
let form = ref({
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
});
const visible = ref(false);
const minVal = 0;
const currentIndex = ref();

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    id as any
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
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    Message.error("加载失败" + res.message);
  }
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

const handleTags = () => {
  return [extent.value, ...tags.value].filter((v) => v);
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
/**
 * 测试用例弹框
 */
const openModel = (index: number) => {
  visible.value = true;
  currentIndex.value = index;
  console.log(form.value.judgeCase);
};
const handleCancel = () => {
  visible.value = false;
};

const doSubmit = async () => {
  form.value.tags = handleTags();
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("更新成功");
    } else {
      Message.error("更新失败" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("创建成功");
    } else {
      Message.error("创建失败" + res.message);
    }
  }
  console.log(form.value);
  router.push({
    path: "/manage/question",
    replace: true,
  });
};
</script>

<style scoped>
#AddQuestionView {
  max-width: 880px;
  margin: auto;
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
</style>
