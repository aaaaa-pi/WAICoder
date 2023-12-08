<template>
  <div id="manageQuestionView">
    <a-card class="manageQuestionList">
      <div class="header">
        <h2>题库列表</h2>
        <a-button
          class="addQuestion"
          type="primary"
          @click="addQuestion"
          :style="{ background: '#065ACC' }"
          >创建题目</a-button
        >
      </div>
      <a-table
        :ref="tableRef"
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
        <template #tags="{ record }">
          <a-space>
            <a-tag v-for="(tag, index) of record.tags" :key="index" bordered>
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #createTime="{ record }">
          {{ dayjs(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <!-- <a-button type="primary" "> 修改</a-button>
            <a-button status="danger" >删除</a-button> -->
            <icon-edit
              :style="{ fontSize: '18px', color: '#0A65CC' }"
              @click="doUpdate(record)"
            />
            <icon-delete
              :style="{ fontSize: '18px', color: 'red' }"
              @click="doDelete(record)"
            />
          </a-space>
        </template>
      </a-table>
    </a-card>
    <AddQuestionView :question-id="questionId" />
  </div>
</template>

<script setup lang="ts">
import { IconDelete, IconEdit } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
import AddQuestionView from "./AddQuestionView.vue";
import { Question, QuestionControllerService } from "../../../generated";
import { ref, watchEffect, onMounted, computed } from "vue";
import dayjs from "dayjs";
import { useStore } from "vuex";
const store = useStore();
const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const questionId = ref();
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  store.commit("loading/showLoading", true);

  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("加载失败" + res.message);
  }

  store.commit("loading/showLoading", false);
};
// 监听修改操作，关闭弹窗重新获取数据
const showDrawerVisible = computed(
  () => store.state.questionDrawer.drawerVisible
);
watchEffect(() => {
  if (!showDrawerVisible.value) {
    loadData();
  }
});
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

const columns = [
  {
    title: "题目id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    dataIndex: "passRate",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    children: [
      {
        title: "时间限制",
        dataIndex: "judgeConfig.timeLimit",
      },
      {
        title: "内存限制",
        dataIndex: "judgeConfig.memoryLimit",
      },
      {
        title: "堆栈限制",
        dataIndex: "judgeConfig.stackLimit",
      },
    ],
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const addQuestion = () => {
  store.commit("questionDrawer/showDrawerVisible", true);
  questionId.value = "";
};
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("删除失败");
  }
};

const doUpdate = (question: Question) => {
  questionId.value = question.id;
  store.commit("questionDrawer/showDrawerVisible", true);
};
</script>

<style scoped>
#manageQuestionView {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.manageQuestionList {
  flex: 1;
  margin-right: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin: 0 6px;
}
.addQuestion {
  display: flex;
  align-self: center;
}
</style>
