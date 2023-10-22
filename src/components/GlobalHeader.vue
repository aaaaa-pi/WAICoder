<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item key="0" disabled>
          <div class="title-bar">
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
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          <!-- <icon :name="item.meta?.icon" /> -->
          <component :is="item.meta?.icon"> </component>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="50px"> <LightSetting /> </a-col>
    <a-col flex="100px">
      <userAvatar />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { routes } from "../router/routes";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import userAvatar from "@/components/userAvatar.vue";
import checkAccess from "@/access/checkAccess";
import LightSetting from "./LightSetting.vue";

const store = useStore();
const router = useRouter();

const user = store.state.user;
const visibleRoutes = computed(() => {
  const loginUser = user.loginUser;
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu || item.path === "/user") {
      return false;
    }
    return checkAccess(loginUser, item.meta?.access as string);
  });
});
// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项的高亮
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
#globalHeader {
  height: 70px;
  border-bottom: 1px solid #eee;
}
.title-bar {
  padding-top: 10px;
}

:deep(.arco-menu-horizontal .arco-menu-inner) {
  height: 70px;
  padding: 0px 20px;
}
</style>
