<template>
  <div id="questionSubmitView">
    <a-card class="questionSubmitList">
      <a-form :model="searchParams" layout="inline">
        <a-form-item
          field="questionId"
          label="题号"
          style="width: 180px"
          class="flex-2"
        >
          <a-input
            v-model="searchParams.questionId"
            placeholder="请输入题目ID"
          />
        </a-form-item>
        <a-form-item
          field="userId"
          label="提交者ID"
          style="width: 180px"
          class="flex-2"
        >
          <a-input v-model="searchParams.userId" placeholder="请输入提交者ID" />
        </a-form-item>
        <a-form-item field="language" style="width: 180px" class="flex-2">
          <a-select
            v-model="searchParams.language"
            :style="{ width: '320px' }"
            placeholder="选择编程语言"
          >
            <a-option v-for="language in codeLanguages" :key="language">
              {{ language }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-button
          type="outline"
          @click="doSubmit"
          :style="{ color: '#065ACC', borderColor: '#065ACC' }"
        >
          <icon-search style="margin-right: 2px" />搜索
        </a-button>
        <a-form-item>
          <a-button
            type="outline"
            @click="refresh"
            :style="{ color: '#27ae60', borderColor: '#27ae60' }"
          >
            <icon-refresh style="margin-right: 2px" />刷新
          </a-button>
        </a-form-item>
      </a-form>
      <a-divider :size="divederSize" />
      <a-table
        :columns="columns"
        :data="dataList"
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
            v-if="record.judgeInfo.result === '等待中'"
            color="gray"
            bordered
          >
            {{ record.judgeInfo.result }}
          </a-tag>
          <a-tag
            v-if="record.judgeInfo.result === '编译错误'"
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
          {{ record.judgeInfo.time ? record.judgeInfo.time : 0 }} ms
        </template>
        <template #memory="{ record }">
          {{ record.judgeInfo.memory ? record.judgeInfo.memory : 0 }} KB
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
  Question,
  QuestionSubmitQueryRequest,
  QuestionControllerService,
} from "../../../generated";
import { ref, onMounted } from "vue";
import moment from "moment";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const dataList = ref([]);
const total = ref(0);
const divederSize = 0;
const codeLanguages = ref(["java", "cpp", "go", "javascript", "typescript"]);
const searchParams = ref<QuestionSubmitQueryRequest>({
  status: undefined,
  userId: undefined,
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  store.commit("loading/showLoading", true);
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("加载失败，" + res.message);
  }
  store.commit("loading/showLoading", false);
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
// watchEffect(() => {
//   loadData();
// });

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "Run ID",
    dataIndex: "id",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "判题结果",
    slotName: "result",
  },
  {
    title: "运行时间",
    slotName: "time",
  },
  {
    title: "运行内存",
    slotName: "memory",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  loadData();
};

const refresh = () => {
  searchParams.value = {
    status: undefined,
    userId: undefined,
    questionId: undefined,
    language: undefined,
    pageSize: 10,
    current: 1,
  };
  loadData();
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};
</script>

<style scoped>
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
#questionSubmitView {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.questionSubmitList {
  flex: 1;
  margin-right: 8px;
}
</style>
