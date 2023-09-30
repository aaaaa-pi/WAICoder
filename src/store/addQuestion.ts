import { StoreOptions } from "vuex";

// initial state
export default {
  namespaced: true,
  state: {
    drawerVisible: false,
  },
  actions: {},
  mutations: {
    showDrawerVisible(state, payload) {
      state.drawerVisible = payload;
    },
  },
} as StoreOptions<any>;
