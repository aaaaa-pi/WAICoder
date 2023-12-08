<template>
  <div class="userLoginView">
    <h2 style="text-align: center">用户注册</h2>
    <a-form
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      style="max-width: 21rem; margin: 0 auto"
      layout="vertical"
    >
      <a-form-item
        :rules="[
          { required: true, message: '账号不能为空' },
          { minLength: 4, message: '账号长度不能低于四位' },
        ]"
        field="userAccount"
        label="账号"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 8, message: '密码长度不能低于八位' },
        ]"
        field="userPassword"
        tooltip="密码不少于6位"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 8, message: '密码长度不能低于八位' },
        ]"
        field="checkPassword"
        tooltip="密码不少于6位"
        label="重复密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 21rem">
          注册
        </a-button>
      </a-form-item>
    </a-form>
    <div class="login">
      已有账号,
      <router-link to="#" @click="toggleLogin" class="loginLine">
        登录
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/message/style/css.js";
import store from "../../store";

const toggleLogin = () => {
  store.dispatch("auth/toggleLogin");
};

const form = reactive<UserRegisterRequest>({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});
const handleSubmit = async () => {
  if (form.userAccount!.length < 4 || form.userPassword!.length < 6) {
    return;
  }
  if (
    form.checkPassword!.length !== form.userPassword!.length ||
    form.checkPassword !== form.userPassword
  ) {
    Message.error("两次输入密码不一致");
    return;
  }
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    Message.success("注册成功！");
    await store.dispatch("user/getLoginUser");
    await toggleLogin();
  } else {
    Message.error(res.msg);
  }
};
</script>
<style scoped>
.login {
  display: block;
  text-align: end;
}
.loginLine {
  text-decoration: none;
  color: #3b82f6;
}
.loginLine:hover {
  text-decoration: underline;
}
</style>
