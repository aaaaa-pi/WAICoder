<template>
  <div id="RecordDetail">
    <a-card class="recordDetail">
      <div class="header">
        <icon-close class="closeIcon" @click="props.closeRecord" />
      </div>
      <div class="main">
        <a-scrollbar style="height: calc(100vh - 120px); overflow: auto">
          <div class="info">
            <a-row>
              <a-col :span="12">
                <div class="useInfo">
                  <div class="avatar">
                    <template v-if="loginUser.userAvatar">
                      <img
                        class="avatar-image"
                        alt="avatar"
                        :src="loginUser.userAvatar"
                      />
                    </template>
                    <template v-else>
                      <a-avatar>
                        <IconUser />
                      </a-avatar>
                    </template>
                  </div>
                  <div class="text">
                    <p class="userName">{{ loginUser.userName }}</p>
                    <p class="recordTime">
                      {{
                        moment(props.recordContent.createTime).format(
                          "YYYY:MM:DD h:mm:ss"
                        )
                      }}
                    </p>
                  </div>
                </div>
              </a-col>
              <a-col :span="6" :offset="6">
                <div class="recordInfo">
                  <div
                    class="suc center"
                    v-if="props.recordContent.judgeInfo?.result === '成功'"
                  >
                    <icon-check-circle :style="{ fontSize: '20px' }" />
                    <span class="recordInfoText"> 成功 </span>
                  </div>
                  <div class="err center" v-else>
                    <icon-close-circle :style="{ fontSize: '20px' }" />
                    <span class="recordInfoText">
                      {{ props.recordContent.judgeInfo?.result }}
                    </span>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="tag">
            <a-tag color="arcoblue" bordered size="small">
              {{ props.recordContent.language }}
            </a-tag>
          </div>
          <div
            class="message"
            v-if="props.recordContent.judgeInfo?.result !== '成功'"
          >
            <p class="label">错误信息</p>
            <div class="messageBox">
              {{ props.recordContent.judgeInfo?.message }}
            </div>
          </div>
          <div class="code">
            <MdViewer :value="codeContent" />
          </div>
        </a-scrollbar>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { LoginUserVO, QuestionSubmitVO } from "../../../generated";
import MdViewer from "@/components/MdViewer.vue";
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import moment from "moment";

interface Props {
  recordContent: QuestionSubmitVO;
  closeRecord: () => void;
}

const props = withDefaults(defineProps<Props>(), {});
const codeContent = ref();
const v1 = "```";

watchEffect(
  () => (codeContent.value = `${v1}\n${props.recordContent.code}\n${v1}`)
);

const store = useStore();
// 获取相关信息
const loginUser = computed<LoginUserVO>(() => store.state.user.loginUser);
</script>

<style scoped>
:deep(.arco-card-body) {
  padding: 8px 16px;
}
#RecordDetail {
  height: 100%;
}
.recordDetail {
  height: 100%;
}
.header {
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.closeIcon {
  color: gray;
  cursor: pointer;
}
.info {
  margin: 16px 0;
}

.useInfo {
  display: flex;
}

.avatar {
  margin-top: 6px;
  margin-right: 4px;
}

.avatar-image {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}
:deep(.arco-avatar) {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}
p {
  margin: 4px;
}
.userName {
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.recordTime {
  color: #3c3c4399;
  font-size: 8px;
}
.recordInfo {
  margin-top: 8px;
}
.err {
  color: #ea2027;
}
.suc {
  color: green;
}
.center {
  display: flex;
  justify-content: center;
  align-content: center;
}
.recordInfoText {
  margin-left: 6px;
  font-size: 16px;
  font-weight: 600;
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
.message {
  margin: 20px 0;
}
</style>
