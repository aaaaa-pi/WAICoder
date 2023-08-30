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
        <a-space size="medium">
          <div class="startTimer" v-if="!showTimer" @click="startTimer">
            <a-tooltip position="bottom" content="开始计时" mini>
              <IconClockCircle />
            </a-tooltip>
          </div>
          <div class="stopTimer" v-if="showTimer" @click="stopTimer">
            <div>{{ formatTime(time) }}</div>
            <IconLoop class="stopTimerIcon" />
          </div>
          <userAvatar />
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import userAvatar from "@/components/userAvatar.vue";
import { ref, watch, onUnmounted } from "vue";

const showTimer = ref(false);
const time = ref(0);
let intervalId: any = null;
const router = useRouter();

const doTitleClick = () => {
  router.push({
    path: "/",
    replace: true,
  });
};
const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};

const startTimer = () => {
  showTimer.value = true;
};
const stopTimer = () => {
  showTimer.value = false;
  time.value = 0;
};

watch(
  () => showTimer.value,
  (newVal: boolean) => {
    if (newVal) {
      intervalId = setInterval(() => {
        time.value++;
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
  }
);
onUnmounted(() => {
  clearInterval(intervalId);
});
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

.startTimer {
  padding: 5px;
  font-size: 20px;
  cursor: pointer;
}
.startTimer:hover {
  background-color: #000a200d;
}
.stopTimer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000a200d;
  border-radius: 5px;
  padding: 5px 10px;
}
.stopTimerIcon {
  font-size: 20px;
  cursor: pointer;
}
</style>
