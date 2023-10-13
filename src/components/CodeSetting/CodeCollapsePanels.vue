<template>
  <div id="CollapsePanels">
    <a-card>
      <div class="container" v-show="isShow">
        <a-tabs size="mini" v-model:activeKey="runContent.activeKey">
          <a-tab-pane key="1" title="自测运行">
            <a-textarea
              v-model="runContent.input"
              class="testText"
              placeholder="请输入示例"
            />
          </a-tab-pane>
          <a-tab-pane key="2" title="执行结果">
            <a-spin
              :loading="waitting"
              style="width: 100%"
              tip="运行中，请稍后..."
            >
              <div v-if="resultData && resultData.result">
                <p
                  v-if="resultData.result === '成功'"
                  :style="{ color: 'green' }"
                  class="result"
                >
                  {{ resultData.result }}
                </p>
                <p v-else :style="{ color: 'red' }" class="result">
                  {{ resultData.result }}
                </p>
                <span class="info">
                  执行用时：
                  <p class="info" v-if="resultData.time">
                    {{ resultData.time }}ms
                  </p>
                  <p class="info" v-else>N/A</p>
                </span>
                <span class="info">
                  消耗内存：
                  <p class="info" v-if="resultData.time">
                    {{ resultData.memory }}KB
                  </p>
                  <p class="info" v-else>N/A</p>
                </span>
                <div class="message">
                  <p class="label">message</p>
                  <div class="messageBox">{{ resultData.message }}</div>
                </div>
              </div>
              <div v-else style="padding-top: 12px">
                <p
                  :style="{
                    textAlign: 'center',
                    color: '#3c3c4399',
                  }"
                >
                  提交之后，这里将会显示运行结果,请先执行代码
                </p>
              </div>
            </a-spin>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="title">
        <a-button @click="changeShow" type="text" size="mini">
          控制台
          <span class="btn-icon">
            <icon-down v-if="isShow" />
            <icon-up v-else />
          </span>
        </a-button>
        <div>
          <a-button size="mini" @click="doRun(runContent)" class="btn-run">
            <icon-play-arrow
              :style="{ marginRight: '2px', fontSize: '10px' }"
            />
            自测运行
          </a-button>
          <a-button type="primary" size="mini" @click="doSubmit">
            提交
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface ResultData {
  result: string;
  message: string;
  time: number;
  memory: number;
}
interface RunContent {
  input: string;
  runMode: number;
  activeKey: string;
}
/**
 * 定义组件属性类型
 */
interface Props {
  waitting: boolean;
  resultData: ResultData;
  doSubmit: () => void;
  doRun: (runContent: RunContent) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  waitting: () => false,
});

const runContent = ref<RunContent>({
  input: "",
  runMode: 2,
  activeKey: "1",
});

const isShow = ref(false);
const changeShow = () => {
  isShow.value = !isShow.value;
};
const resultData = computed(() => props.resultData);
</script>

<style scoped>
:deep(.arco-tabs-content) {
  padding-top: 0;
}
.title {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-run {
  margin-right: 6px;
}
.container {
  bottom: 50px;
  padding: 0 12px 16px 12px;
  border-bottom: 1px solid #efefef;
}

.testText {
  margin-top: 10px;
}
.btn-icon {
  margin-left: 4px;
}
.result {
  font-size: 18px;
  margin-bottom: 0px;
}
.info {
  display: inline-block;
  font-size: 8px;
  margin-right: 10px;
}
.label {
  margin: 4px 0 8px 4px;
  font-size: 12px;
  color: #3c3c4399;
}
.messageBox {
  background: #000a200d;
  padding: 12px;
}
</style>
