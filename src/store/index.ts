import { createStore } from "vuex";
import user from "./user";
import auth from "./auth";
import loading from "./loading";
import questionDrawer from "./addQuestion";
import theme from "./theme";
import code from "./code";

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
    loading,
    questionDrawer,
    theme,
    code,
  },
});
