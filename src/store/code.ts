import { StoreOptions } from "vuex";

// initial state
export default {
  namespaced: true,
  state: {
    codePatterns: localStorage.getItem("codePatterns")
      ? localStorage.getItem("codePatterns")
      : "1",
  },
  actions: {},
  mutations: {
    // 修改代码模式，并将模式存入localStorage
    changePatterns(state, code) {
      state.codePatterns = code.codePatterns;
      localStorage.setItem("codePatterns", code.codePatterns);
    },
  },
} as StoreOptions<any>;
