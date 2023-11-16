<template>
  <div class="errPage-container">
    <a-button icon="arrow-left" class="pan-back-btn" @click="back">
      返回
    </a-button>
    <a-row>
      <a-col :span="12">
        <h1 class="text-jumbo text-ginormous">401错误!</h1>
        <h2 class="text-info">您没有访问权限！</h2>
        <h6 class="text-info">
          对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面
        </h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/"> 回首页 </router-link>
          </li>
        </ul>
      </a-col>
      <a-col :span="12">
        <img
          :src="error"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import errGif from "@/assets/401_images/401.gif";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const error = ref(errGif + "?" + +new Date());
const back = () => {
  if (route.query.noGoBack) {
    router.push({ path: "/" });
  } else {
    router.go(-1);
  }
};
</script>

<style scoped>
.errPage-container {
  position: absolute;
  width: 800px;
  max-width: 100%;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pan-back-btn {
  background: #3491fa;
  color: #fff;
  border: none !important;
}
.pan-gif {
  margin: 0 auto;
  display: block;
}
.pan-img {
  display: block;
  margin: 0 auto;
  width: 100%;
}
.text-jumbo {
  font-size: 60px;
  font-weight: 700;
  color: var(--color-text-1);
}
.link-type {
  list-style: none;
}
.text-info {
  color: var(--color-text-1);
}
.list-unstyled {
  font-size: 14px;
}
li {
  padding-bottom: 5px;
}
a {
  color: #3491fa;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
