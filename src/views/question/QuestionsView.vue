<template>
  <div id="questionsView">
    <a-card class="questionList">
      <a-form :model="searchParams" layout="inline" class="searchParams">
        <a-form-item
          field="state"
          label="状态"
          style="width: 130px"
          class="flex-1"
        >
          <a-dropdown-button>
            全部
            <template #icon>
              <icon-down />
            </template>
            <template #content>
              <a-doption>未开始</a-doption>
              <a-doption>已解答</a-doption>
              <a-doption>尝试过</a-doption>
            </template>
          </a-dropdown-button>
        </a-form-item>
        <a-form-item
          field="extent"
          label="难度"
          style="width: 130px"
          class="flex-1"
        >
          <a-dropdown-button>
            全部
            <template #icon>
              <icon-down />
            </template>
            <template #content>
              <a-doption style="color: #00af9b">简单</a-doption>
              <a-doption style="color: #ffb800">中等</a-doption>
              <a-doption style="color: #ff2d55">困难</a-doption>
            </template>
          </a-dropdown-button>
        </a-form-item>
        <a-form-item field="tags" class="flex-2" style="min-width: 200px">
          <template #label>
            <div><icon-tags style="margin-right: 5px" />标签</div>
          </template>
          <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
        </a-form-item>
        <a-form-item field="title" class="flex-2" style="min-width: 200px">
          <a-input-search
            v-model="title"
            placeholder="请输入搜索关键词"
            @search="doSubmit"
          />
        </a-form-item>
        <div class="random">
          <svg
            width="24.000000"
            height="24.000000"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <desc>Created with Pixso.</desc>
            <defs />
            <path
              id="random"
              d="M24.2787 14.1008L22.7837 14.085L20.1506 16.1889L18.458 14.7498L21.1185 12.6194L21.1318 12.6285C21.3785 12.4357 21.7454 12.2974 22.1764 12.302L24.3179 12.3246L23.9196 12.0629C23.6807 11.9005 23.5374 11.6769 23.5428 11.4282C23.5537 10.9398 24.1686 10.5466 24.9093 10.5544C25.2865 10.5584 25.6211 10.6597 25.86 10.8221L28.5145 12.6266C28.7534 12.7891 28.8967 13.0126 28.8912 13.2613C28.8857 13.5099 28.7327 13.7304 28.4867 13.8877L25.7537 15.6353C25.5077 15.7926 25.1688 15.8867 24.7917 15.8828C24.0509 15.8749 23.4537 15.4689 23.4645 14.9804C23.47 14.7318 23.623 14.5113 23.8824 14.3542L24.2787 14.1008ZM25.6641 19.7028C25.4252 19.5404 25.0906 19.4391 24.7134 19.4352C23.9727 19.4273 23.3577 19.8206 23.3469 20.309C23.3414 20.5576 23.4847 20.7812 23.7236 20.9436L24.1219 21.2054L22.627 21.1896L12.4446 12.5368L12.431 12.5366C12.193 12.3387 11.8324 12.1927 11.4015 12.1882L8.70764 12.1597C7.96692 12.1519 7.35193 12.5451 7.34119 13.0335C7.33044 13.522 7.92773 13.928 8.66846 13.9358L10.7157 13.9575L20.8981 22.6103L20.9117 22.6016C21.1497 22.8083 21.5103 22.9543 21.9413 22.9589L24.0828 22.9815L23.6865 23.2349C23.4271 23.3921 23.274 23.6125 23.2686 23.8611C23.2577 24.3496 23.855 24.7556 24.5958 24.7635C24.9729 24.7675 25.3118 24.6733 25.5577 24.5161L28.2908 22.7684C28.5367 22.6111 28.6898 22.3907 28.6953 22.1421C28.7008 21.8934 28.5575 21.6699 28.3186 21.5074L25.6641 19.7028ZM8.51135 21.0403L10.5587 21.0619L13.1918 18.9579L14.8842 20.4059L12.2238 22.5274L12.2106 22.5184C11.9637 22.7112 11.5969 22.8494 11.166 22.8448L8.47217 22.8163C7.73145 22.8085 7.13416 22.4025 7.1449 21.9141C7.15576 21.4257 7.77063 21.0324 8.51135 21.0403Z"
              clip-rule="evenodd"
              fill-rule="evenodd"
              fill="#0A65CC"
              fill-opacity="1.000000"
            />
            <circle
              id="椭圆 1"
              cx="18.000000"
              cy="18.000000"
              r="18.000000"
              fill="#0A65CC"
              fill-opacity="0.15"
            />
          </svg>
          <div class="random-text">随机一题</div>
        </div>
        <!-- <a-button type="primary" @click="doSubmit">搜索</a-button> -->
      </a-form>
      <a-divider :size="divederSize" />
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
      >
        <template #tags="{ record }">
          <a-space>
            <a-tag
              v-for="(tag, index) of record.tags"
              :key="index"
              size="small"
              bordered
            >
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #acceptedRate="{ record }">
          {{
            `${
              record.submitNum ? record.acceptedNum / record.submitNum : "0"
            } %`
          }}
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <!-- <a-button type="primary" @click="toQuestionPage(record)">
              做题
            </a-button> -->
            <a-tooltip position="bottom" content="做题" mini>
              <icon-find-replace
                class="operate"
                @click="toQuestionPage(record)"
              />
            </a-tooltip>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <a-card class="progress">当前进度 </a-card>
  </div>
</template>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { ref, onMounted, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  pageSize: 10,
  current: 1,
});
const title = ref<string>();

const divederSize = 0;

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
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
watch(searchParams.value, () => {
  loadData();
});
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  // {
  //   title: "题号",
  //   dataIndex: "id",
  // },
  {
    title: "状态",
    slotName: "state",
  },
  {
    title: "题目",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  // {
  //   title: "创建时间",
  //   slotName: "createTime",
  // },
  {
    title: "难度",
    slotName: "extent",
  },
  {
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({ path: `/view/question/${question.id}` });
};

const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    title: title.value,
    current: 1,
  };
};
</script>

<style scoped>
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
#questionsView {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
.questionList {
  flex: 1;
  margin-right: 8px;
}
.progress {
  width: 250px;
  height: 150px;
}

.searchParams {
  display: flex;
}
.operate {
  cursor: pointer;
}
.random {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-bottom: 10px;
}
.random-text {
  display: inline-block;
  transform: rotate(0.61deg);
  color: rgb(10, 101, 204);
  font-family: 思源黑体;
  font-size: 12px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
  margin-left: 5px;
}
</style>
