<template>
  <div id="userLoginView">
    <h2 style="text-align: center">用户登录</h2>
    <a-form
      style="max-width: 21rem; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
      layout="vertical"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 21rem">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div class="signup">
      没有账户吗？
      <router-link to="#" @click="toggleSignUp" class="signupLine">
        注册
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import "@arco-design/web-vue/es/message/style/css.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    message.success("登录成功！");
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
    window.location.reload();
  } else {
    message.error("登录失败：" + res.message);
  }
};

const toggleSignUp = () => {
  store.dispatch("auth/toggleSignUp");
};
</script>

<style scoped>
.signup {
  display: block;
  text-align: end;
}
.signupLine {
  text-decoration: none;
  color: #3b82f6;
}
.signupLine:hover {
  text-decoration: underline;
}
</style>
