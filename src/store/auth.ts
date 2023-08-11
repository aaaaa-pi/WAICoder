import { StoreOptions } from "vuex";

// initial state
export default {
  namespaced: true,
  state: {
    modals: {}, // 弹窗状态存储在modals对象中
  },
  actions: {
    toggleLogin({ commit }) {
      commit("toggleModals", {
        login: true,
        signup: false,
      });
    },
    toggleSignUp({ commit }) {
      commit("toggleModals", {
        login: false,
        signup: true,
      });
    },
  },
  mutations: {
    updateModal(state, { modelName, value }) {
      state.modals[modelName] = value;
    },
    clearModal(state) {
      state.modals = {};
    },
    toggleModals(state, { login, signup }) {
      state.modals.login = login;
      state.modals.signup = signup;
    },
  },
} as StoreOptions<any>;
