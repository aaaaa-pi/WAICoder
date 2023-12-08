<template>
  <div class="about center">
    <a-card hoverable :style="{ width: '70vw' }" class="aboutCard">
      <div class="content center">
        <div class="avatar">
          <a-avatar :style="{ backgroundColor: '#0A65CC' }">
            <template v-if="loginUser.userAvatar">
              <img
                class="avatar-image"
                alt="avatar"
                :src="loginUser.userAvatar"
              />
            </template>
            <template v-else>
              <icon-user />
            </template>
          </a-avatar>
        </div>
        <div class="userInfo">
          <p style="text-align: center">
            <icon-user :style="{ fontSize: '15px' }" stroke-linecap="round" />
            {{ loginUser.userName ? loginUser.userName : "null" }}
          </p>
          <p style="text-align: center">
            <icon-idcard :style="{ fontSize: '15px' }" stroke-linecap="round" />
            {{
              loginUser.userProfile
                ? loginUser.userProfile
                : "http://www.baidu.com"
            }}
          </p>
        </div>
        <a-button
          @click="handleEditor"
          type="outline"
          status="primary"
          class="editor"
          >编辑个人资料
        </a-button>
      </div>

      <a-divider :size="divederSize" />
      <a-card>
        <calendar-heatmap :values="timeValue" end-date="2021-07-08" />
      </a-card>
    </a-card>
  </div>
</template>

<script setup>
import { IconUser, IconIdcard } from "@arco-design/web-vue/es/icon";
import { useStore } from "vuex";
import { computed } from "vue";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const divederSize = 0;

// 获取相关信息
const loginUser = computed(() => store.state.user.loginUser);

const timeValue = [
  { date: "2020-08-02", count: 6 },
  { date: "2020-08-03", count: 6 },
  { date: "2020-08-04", count: 6 },
  { date: "2020-08-05", count: 6 },
  { date: "2020-08-06", count: 6 },
  { date: "2020-08-07", count: 6 },
  { date: "2020-08-08", count: 6 },
  { date: "2020-08-15", count: 6 },
  { date: "2020-08-22", count: 6 },
  { date: "2020-08-29", count: 6 },
  { date: "2020-09-05", count: 6 },
  { date: "2020-09-28", count: 6 },
  { date: "2020-09-22", count: 6 },
  { date: "2020-09-23", count: 6 },
  { date: "2020-09-24", count: 6 },
  { date: "2020-10-04", count: 6 },
  { date: "2020-10-02", count: 6 },
  { date: "2020-10-10", count: 6 },
  { date: "2020-10-11", count: 6 },
  { date: "2020-10-17", count: 6 },
  { date: "2020-10-19", count: 6 },
  { date: "2020-10-23", count: 6 },
  { date: "2020-10-27", count: 6 },
  { date: "2020-10-28", count: 6 },
  { date: "2020-10-29", count: 6 },
  { date: "2020-11-22", count: 6 },
  { date: "2020-11-30", count: 6 },
  { date: "2020-12-08", count: 6 },
  { date: "2020-12-16", count: 6 },
  { date: "2020-12-24", count: 6 },
  { date: "2021-01-01", count: 6 },
  { date: "2021-01-09", count: 6 },
  { date: "2021-01-16", count: 6 },
  { date: "2021-01-22", count: 6 },
  { date: "2021-01-28", count: 6 },
  { date: "2021-02-03", count: 6 },
  { date: "2021-02-09", count: 6 },
  { date: "2021-02-15", count: 6 },
  { date: "2021-02-21", count: 6 },
  { date: "2021-03-21", count: 6 },
  { date: "2021-03-22", count: 6 },
  { date: "2021-03-23", count: 6 },
  { date: "2021-03-24", count: 6 },
  { date: "2021-03-25", count: 6 },
  { date: "2021-03-26", count: 6 },
  { date: "2021-03-27", count: 6 },
  { date: "2021-03-28", count: 6 },
  { date: "2021-03-31", count: 6 },
  { date: "2021-04-03", count: 6 },
  { date: "2021-04-07", count: 6 },
  { date: "2021-04-04", count: 6 },
  { date: "2021-04-10", count: 6 },
  { date: "2021-04-11", count: 6 },
  { date: "2021-04-14", count: 6 },
  { date: "2021-04-17", count: 6 },
  { date: "2021-04-18", count: 6 },
  { date: "2021-04-21", count: 6 },
  { date: "2021-04-24", count: 6 },
  { date: "2021-04-25", count: 6 },
  { date: "2021-04-28", count: 6 },
  { date: "2021-05-01", count: 6 },
  { date: "2021-05-02", count: 6 },
  { date: "2021-05-05", count: 6 },
  { date: "2021-05-08", count: 6 },
  { date: "2021-05-09", count: 6 },
  { date: "2021-05-12", count: 6 },
  { date: "2021-05-15", count: 6 },
];

const handleEditor = () => {
  router.push({
    path: "/profile/info",
    replace: true,
  });
};
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  width: 100%;
  flex-direction: column;
}
.arco-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.arco-card-size-medium {
  font-size: 8px;
}
:deep(.vch__container .vch__legend) {
  display: none;
}

.editor {
  align-self: flex-end;
}
</style>
