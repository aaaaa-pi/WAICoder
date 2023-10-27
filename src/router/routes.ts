import { RouteRecordRaw } from "vue-router";
import QuestionLayout from "@/layouts/QuestionLayout.vue";
import BasicLayout from "@/layouts/BasicLayout.vue";
import { IconList, IconBookmark, IconBook } from "@arco-design/web-vue/es/icon";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: () => import("../views/HomeView.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: () => import("../views/question/QuestionsView.vue"),
    meta: {
      icon: IconList,
      layout: BasicLayout,
    },
  },
  {
    path: "/question_submit",
    name: "题目提交",
    component: () => import("../views/question/QuestionSubmitView.vue"),
    meta: {
      icon: IconBookmark,
      layout: BasicLayout,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: () => import("../views/question/ViewQuestionView.vue"),
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
    component: () => import("../views/question/ManageQuestionView.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
      icon: IconBook,
      layout: BasicLayout,
    },
  },
  {
    path: "/about",
    name: "个人中心",
    component: () => import("../views/AboutView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/profile/info",
    name: "编辑资料",
    component: () => import("../views/UserView.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("../views/error/401.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/error/404.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/:pathMatch(.*)", // 匹配所有路由
    redirect: "/404",
  },
];
