<template>
  <a-row id="quesrionHeader" align="center" :wrap="false">
    <a-col :span="4">
      <div class="title-bar" @click="doTitleClick">
        <svg
          width="180.558441"
          height="22.500000"
          viewBox="0 0 281.558 22.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <desc>Created with Pixso.</desc>
          <defs />
          <path
            id="&lt; WAICoder /&gt;"
            d="M53.2105 2.8125L58.7564 2.8125L59.7671 14.5459L64.6274 2.12695L70.4898 2.12695L62.2105 22.5L55.979 22.5L54.5816 12.498L50.4419 22.5L44.2105 22.5L41.8023 2.8125L41.1167 2.12695L47.6646 2.12695L48.7105 14.5459L53.2105 2.8125ZM94.5719 2.12695L97.3141 22.5L91.1178 22.5L90.3971 16.9541L81.7575 16.9541L79.3493 22.5L73.4782 22.5L81.4323 3.1377L80.3952 2.12695L94.5719 2.12695ZM86.6178 5.58105L83.1637 13.5L90.0719 13.5L89.0348 5.58105L86.6178 5.58105ZM110.347 2.12695L107.209 22.5L100.661 22.5L103.069 3.49805L102.023 2.12695L110.347 2.12695ZM158.188 7.3125Q159.234 7.3125 159.752 8.15625Q160.271 9 160.271 10.0459L158.548 22.5L142.992 22.5Q141.955 22.5 141.427 21.8232Q140.909 21.1377 140.909 20.0918L142.631 7.3125L158.188 7.3125ZM149.188 10.7666L147.817 19.0459L151.957 19.0459L153.363 10.7666L149.188 10.7666ZM176.982 0.0351562L183.89 0.0351562L180.796 22.5L165.24 22.5Q164.203 22.5 163.675 21.8232Q163.157 21.1377 163.157 20.0918L164.879 7.3125L175.936 7.3125L176.982 0.0351562ZM171.251 10.7666L169.924 19.0459L174.319 19.0459L175.611 10.7666L171.251 10.7666ZM204.882 16.2773L193.825 16.2773L193.465 19.0459L203.15 19.0459L204.882 17.6748L203.836 22.5L188.64 22.5Q187.603 22.5 187.075 21.8232Q186.557 21.1377 186.557 20.0918L188.279 7.3125L206.244 7.3125L204.882 16.2773ZM194.836 10.7666L194.511 12.8145L198.65 12.8145L199.011 10.7666L194.836 10.7666ZM217.408 7.3125L216.722 12.1377L221.583 7.3125L228.491 7.3125L216.722 17.6748L216.037 22.5L209.129 22.5L211.141 8.31445L210.421 7.3125L217.408 7.3125Z"
            fill-rule="evenodd"
            fill="#065ACC"
          />
          <path
            id="&lt; WAICoder /&gt;"
            d="M14.335 16.1982L13.5352 21.5332L0 14.6514L0.650391 10.0107L16.1279 3.1377L15.3369 8.78906L5.97656 12.498L14.335 16.1982ZM115.887 22.5Q115.386 22.5 114.947 22.3242Q114.516 22.1396 114.209 21.8232Q113.91 21.498 113.796 21.0498Q113.69 20.5928 113.84 20.0918L116.248 2.12695L138.027 2.12695L137.667 5.58105L122.479 5.58105L120.748 19.0459L134.213 19.0459L135.935 17.6748L135.259 22.5L115.887 22.5ZM261.904 0L255.998 22.4648L251.172 22.4648L257.079 0L261.904 0ZM265.466 21.5332L266.186 15.8818L275.582 12.1729L267.267 8.46387L267.988 3.1377L281.558 10.0107L280.908 14.6514L265.466 21.5332Z"
            fill-rule="evenodd"
            fill="#2C3E50"
          />
        </svg>
      </div>
    </a-col>
    <a-col :span="8" :offset="6">
      <div class="start">
        <a-space size="medium">
          <!-- <a-button size="mini">题库</a-button> -->
          <a-button size="mini" type="outline" @click="getPrevQuestion">
            <icon-left />
            <p>上一题</p>
          </a-button>
          <a-button size="mini" type="outline" @click="getNextQuestion">
            <p>下一题</p>
            <icon-right />
          </a-button>
          <div class="random" @click="matchQuestion">
            <svg
              width="24.000031"
              height="24.002396"
              viewBox="0 0 36 36.0024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <desc>Created with Pixso.</desc>
              <defs />
              <path
                id="random"
                d="M24.2787 14.1017L22.7837 14.0859L20.1506 16.19L18.458 14.7508L21.1186 12.6203L21.1318 12.6294C21.3786 12.4366 21.7454 12.2983 22.1764 12.3029L24.3179 12.3255L23.9196 12.0637C23.6806 11.9013 23.5374 11.6777 23.5429 11.429C23.5536 10.9405 24.1686 10.5473 24.9094 10.5551C25.2865 10.5591 25.6211 10.6604 25.86 10.8228L28.5145 12.6275C28.7534 12.7899 28.8967 13.0135 28.8912 13.2622C28.8857 13.5109 28.7326 13.7314 28.4867 13.8886L25.7537 15.6364C25.5077 15.7937 25.1689 15.8878 24.7917 15.8838C24.0509 15.876 23.4537 15.4699 23.4644 14.9814C23.4699 14.7328 23.623 14.5123 23.8824 14.3552L24.2787 14.1017ZM25.664 19.7041C25.4251 19.5417 25.0905 19.4405 24.7134 19.4365C23.9726 19.4286 23.3577 19.8219 23.3469 20.3103C23.3414 20.559 23.4847 20.7826 23.7236 20.945L24.122 21.2068L22.627 21.191L12.4445 12.5377L12.4311 12.5375C12.193 12.3396 11.8324 12.1936 11.4014 12.1891L8.70767 12.1606C7.96689 12.1527 7.35196 12.546 7.34119 13.0344C7.33038 13.5229 7.92767 13.929 8.66846 13.9368L10.7157 13.9584L20.8981 22.6118L20.9118 22.6031C21.1497 22.8099 21.5102 22.9559 21.9412 22.9604L24.0828 22.9831L23.6865 23.2365C23.4271 23.3936 23.274 23.6141 23.2685 23.8628C23.2577 24.3513 23.855 24.7573 24.5958 24.7651C24.9729 24.7691 25.3118 24.675 25.5577 24.5177L28.2907 22.77C28.5367 22.6127 28.6898 22.3922 28.6953 22.1436C28.7007 21.8949 28.5575 21.6713 28.3186 21.5089L25.664 19.7041ZM8.51138 21.0417L10.5587 21.0634L13.1917 18.9593L14.8842 20.4073L12.2238 22.5289L12.2105 22.5199C11.9637 22.7127 11.597 22.851 11.166 22.8464L8.47217 22.8179C7.73138 22.8101 7.13412 22.404 7.1449 21.9156C7.1557 21.4271 7.7706 21.0338 8.51138 21.0417Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
                fill="#0A65CC"
                fill-opacity="1.000000"
              />
              <rect
                id="矩形 1"
                x="0.000031"
                y="0.000031"
                rx="9.000000"
                width="36.000000"
                height="36.000000"
                transform="rotate(-0.000113785 0.000031 0.000031)"
                fill="#0A65CC"
                fill-opacity="0.15"
              />
            </svg>
          </div>
        </a-space>
      </div>
    </a-col>
    <a-col :span="4" :offset="2">
      <div class="end">
        <a-space size="medium">
          <div class="startTimer" v-if="!showTimer" @click="startTimer">
            <a-tooltip position="bottom" content="开始计时" mini>
              <IconClockCircle
                :style="{
                  fontSize: '22px',
                  color: '#0A65CC',
                  marginTop: '2px',
                }"
              />
            </a-tooltip>
          </div>
          <div class="stopTimer" v-if="showTimer" @click="stopTimer">
            <div>{{ formatTime(time) }}</div>
            <IconLoop class="stopTimerIcon" :style="{ color: '#0A65CC' }" />
          </div>
          <userAvatar />
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import userAvatar from "@/components/userAvatar.vue";
import { QuestionControllerService } from "../../generated";
import { ref, watch, onUnmounted } from "vue";
import { Message } from "@arco-design/web-vue";

const showTimer = ref(false);
const time = ref(0);
let intervalId: any = null;
const router = useRouter();
const route = useRoute();

const questionId = ref(route.params.id);
watch(route, () => {
  questionId.value = route.params.id as string;
});

const doTitleClick = () => {
  router.push({
    path: "/",
    replace: true,
  });
};
const getPrevQuestion = async () => {
  const res = await QuestionControllerService.getPreviousQuestionUsingGet(
    questionId.value as any
  );
  if (res.message === "OK") {
    router.push({ path: `/view/question/${res.data?.id}` });
  } else {
    Message.error("已经是第一道题目啦！");
  }
};

const getNextQuestion = async () => {
  const res = await QuestionControllerService.getNextQuestionUsingGet(
    questionId.value as any
  );
  if (res.message === "OK") {
    router.push({ path: `/view/question/${res.data?.id}` });
  } else {
    Message.error("已经是最后的一道题目啦！");
  }
};
const matchQuestion = async () => {
  const res = await QuestionControllerService.matchQuestionVoUsingGet(
    questionId.value as any
  );
  if (res.message === "OK") {
    router.push({ path: `/view/question/${res.data?.id}` });
  } else {
    Message.error("error");
  }
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
.title-bar {
  cursor: pointer;
}
:deep(.arco-menu-horizontal .arco-menu-inner) {
  padding: 0px 25px;
}
.start {
  display: flex;
}
.random {
  margin-top: 2px;
  cursor: pointer;
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
  background-color: rgba(10, 101, 204, 0.15);
  border-radius: 5px;
  padding: 5px 10px;
}
.stopTimerIcon {
  font-size: 20px;
  cursor: pointer;
  margin-top: "2px";
}
</style>
