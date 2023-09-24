import { createStore } from "vuex";
import user from "./user";
import auth from "./auth";
import loading from "./loading";

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
    loading,
  },
});
