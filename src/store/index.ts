import { createStore } from "vuex";
import user from "./user";
import auth from "./auth";

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
  },
});
