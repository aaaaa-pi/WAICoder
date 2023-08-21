<template>
  <a-row id="quesrionHeader" align="center" :wrap="false">
    <a-col :span="4">
      <div class="start">
        <a-space size="medium">
          <div class="title-bar" @click="doTitleClick">
            <p class="title" style="cursor: pointer">Online Judge</p>
          </div>
          <a-button size="mini">题库</a-button>
        </a-space>
      </div>
    </a-col>
    <a-col :span="4" :offset="16">
      <div class="end">
        <a-space>
          <a-button size="mini">开始计时</a-button>
          <userAvatar />
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import userAvatar from "@/components/userAvatar.vue";

const router = useRouter();

const doTitleClick = () => {
  router.push({
    path: "/",
    replace: true,
  });
};
</script>

<style scoped>
#quesrionHeader {
  height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #cdcdcd;
}
.title {
  font-size: 10px;
  color: #444;
}
:deep(.arco-menu-horizontal .arco-menu-inner) {
  padding: 0px 25px;
}
.start {
  display: flex;
}
.end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
