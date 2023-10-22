import { StoreOptions } from "vuex";

// initial state
export default {
  namespaced: true,
  state: {
    theme: "light",
  },
  actions: {},
  mutations: {
    toggleTheme(state, payload) {
      state.theme = payload;
    },
  },
} as StoreOptions<any>;
