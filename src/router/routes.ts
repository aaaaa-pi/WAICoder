import { RouteRecordRaw } from "vue-router";
import QuestionLayout from "@/layouts/QuestionLayout.vue";
import BasicLayout from "@/layouts/BasicLayout.vue";
import { IconList, IconBookmark, IconBook } from "@arco-design/web-vue/es/icon";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/HomeView.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: () =>
      import(
        /* webpackChunkName: "questionView" */ "../views/question/QuestionsView.vue"
      ),
    meta: {
      icon: IconList,
      layout: BasicLayout,
    },
  },
  {
    path: "/question_submit",
    name: "题目提交",
    component: () =>
      import(
        /* webpackChunkName: "questionSubmitView" */ "../views/question/QuestionSubmitView.vue"
      ),
    meta: {
      icon: IconBookmark,
      layout: BasicLayout,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: () =>
      import(
        /* webpackChunkName: "viewQuestionView" */ "../views/question/ViewQuestionView.vue"
      ),
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
      layout: QuestionLayout,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: () =>
      import(
        /* webpackChunkName: "manageQuestionView" */ "../views/question/ManageQuestionView.vue"
      ),
    meta: {
      access: ACCESS_ENUM.ADMIN,
      icon: IconBook,
      layout: BasicLayout,
    },
  },
  {
    path: "/about",
    name: "个人中心",
    component: () =>
      import(/* webpackChunkName: "aboutView" */ "../views/user/AboutView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/profile/info",
    name: "编辑资料",
    component: () =>
      import(/* webpackChunkName: "userView" */ "../views/user/UserView.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () =>
      import(/* webpackChunkName: "401" */ "../views/error/401.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/error/404.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/:pathMatch(.*)", // 匹配所有路由
    redirect: "/404",
  },
];
