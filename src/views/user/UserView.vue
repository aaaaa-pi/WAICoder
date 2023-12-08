<template>
  <div class="info center">
    <a-card hoverable :style="{ width: '70vw' }" class="aboutCard">
      <div class="content center">
        <div class="avatar">
          <!-- <a-space direction="vertical" :style="{ width: '100%' }">
            <a-upload
              action="/"
              :fileList="file ? [file] : []"
              :show-file-list="false"
              @change="onChange"
              @progress="onProgress"
            >
              <template #upload-button>
                <div
                  :class="`arco-upload-list-item${
                    file && file.status === 'error'
                      ? ' arco-upload-list-item-error'
                      : ''
                  }`"
                >
                  <div
                    class="arco-upload-list-picture custom-upload-avatar"
                    v-if="file && file.url"
                  >
                    <img :src="file.url" />
                    <div class="arco-upload-list-picture-mask">
                      <IconEdit />
                    </div>
                    <a-progress
                      v-if="file.status === 'uploading' && file.percent < 100"
                      :percent="file.percent"
                      type="circle"
                      size="mini"
                      :style="{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                      }"
                    />
                  </div>
                  <div class="arco-upload-picture-card" v-else>
                    <template v-if="loginUser.userAvatar">
                      <img
                        class="avatar-image"
                        alt="avatar"
                        :src="loginUser.userAvatar"
                      />
                    </template>
                    <template v-else>
                      <IconUser
                        :style="{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translateX(-50%) translateY(-50%)',
                          fontSize: '32px',
                        }"
                      />
                    </template>
                    <div class="arco-upload-list-picture-mask">
                      <IconEdit />
                    </div>
                  </div>
                </div>
              </template>
            </a-upload>
          </a-space> -->
          <a-avatar @click="onClcik" :style="{ backgroundColor: '#0A65CC' }">
            <icon-user />
            <template #trigger-icon>
              <icon-edit />
            </template>
          </a-avatar>
        </div>
        <div class="info">
          <a-space
            direction="vertical"
            size="large"
            :style="{ width: '600px' }"
          >
            <a-form :model="form" layout="vertical">
              <a-form-item field="userName" label="昵称">
                <a-input v-model="form.userName" placeholder="昵称（必填项）" />
              </a-form-item>
              <a-form-item field="userProfile" label="个人介绍">
                <a-textarea
                  v-model="form.userProfile"
                  placeholder="关于你的个性、兴趣或者经验"
                  :max-length="{ length: 100, errorOnly: true }"
                  allow-clear
                  show-word-limit
                />
              </a-form-item>
              <a-button type="primary" class="save" @click="saveInfo"
                >保存</a-button
              >
            </a-form>
          </a-space>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { IconUser, IconEdit } from "@arco-design/web-vue/es/icon";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/message/style/css.js";
import { UserControllerService } from "../../../generated";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

// 获取相关信息
const loginUser = computed(() => store.state.user.loginUser);
console.log(loginUser);

const form = ref({
  userName: loginUser.value.userName,
  userProfile: loginUser.value.userProfile,
});

// 上传头像功能
// const file = ref();

// const onChange = (_, currentFile) => {
//   file.value = {
//     ...currentFile,
//     url: URL.createObjectURL(currentFile.file),
//   };
// };
// const onProgress = (currentFile) => {
//   file.value = currentFile;
// };
const saveInfo = async () => {
  console.log(form.value);
  const res = await UserControllerService.updateMyUserUsingPost(form.value);
  if (res.code === 0) {
    Message.success("修改个人信息成功");
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/about",
      replace: true,
    });
  } else {
    Message.error("修改个人信息失败" + res.message);
  }
};
const onClcik = () => {
  Message.info("暂时还未开发");
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
.save {
  align-self: flex-end;
}
:deep(.vch__container .vch__legend) {
  display: none;
}
</style>
