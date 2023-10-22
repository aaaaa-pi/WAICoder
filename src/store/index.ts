import { createStore } from "vuex";
import user from "./user";
import auth from "./auth";
import loading from "./loading";
import questionDrawer from "./addQuestion";
import theme from "./theme";

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
    loading,
    questionDrawer,
    theme,
  },
});
