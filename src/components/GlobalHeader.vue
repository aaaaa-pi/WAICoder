<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <p class="title">Online Judge</p>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
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
  height: 60px;
}
.title {
  color: #444;
}
:deep(.arco-menu-horizontal .arco-menu-inner) {
  padding: 0px 20px;
}
</style>
