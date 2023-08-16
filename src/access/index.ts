import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "./checkAccess";

router.beforeEach(async (to, from, next) => {
  const user = store.state.user;
  let currentUser = user.loginUser;
  // 实现自动登录
  if (!currentUser || !currentUser.userRole) {
    await store.dispatch("user/getLoginUser");
    currentUser = user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没有登录，则跳出登录弹窗
    if (
      !currentUser.userRole ||
      currentUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      store.commit("auth/updateModal", { modelName: "login", value: true });
      next("#");
      return;
    }
    // 如果已经登录，权限不足则跳转到401页面
    if (!checkAccess(currentUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
