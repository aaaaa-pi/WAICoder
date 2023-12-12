// src\hooks\useMonacoEditor.ts
import loader from "@monaco-editor/loader";
import { ref } from "vue";

loader.config({
  paths: {
    vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.43.0/min/vs",
  },
});
const monacoRef = ref<any>(null);
const isLoading = ref<boolean>(false); // 添加一个状态来表示是否正在加载
const monacoLoader = loader.init();

const initMonaco = () => {
  return new Promise<void>((resolve, reject) => {
    if (monacoRef.value) {
      resolve();
      return;
    }
    isLoading.value = true; // 开始加载
    monacoLoader
      .then((monacoInstance) => {
        monacoRef.value = monacoInstance;
        isLoading.value = false; // 加载完成
        resolve();
      })
      .catch((error) => {
        isLoading.value = false; // 加载失败
        if (error?.type !== "cancelation") {
          console.error("Monaco initialization error:", error);
          reject();
        }
      });
  });
};

export function useMonacoEditor() {
  return {
    initMonaco,
    monacoRef,
    isLoading,
  };
}
