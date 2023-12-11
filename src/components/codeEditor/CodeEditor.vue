<template>
  <a-spin :loading="isLoading" tip="加载中，请稍后...">
    <div id="code-editor" ref="codeEditorRef" />
  </a-spin>
</template>

<script setup lang="ts">
import { useMonacoEditor } from "@/hooks/useMonacoEditor";
const { monacoRef, initMonaco, isLoading } = useMonacoEditor();
import { ref, onMounted, toRaw, watch, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const theme = computed(() => store.state.theme.theme);

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  codeDefault: string;
  handleChange: (v: string) => void;
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  codeDefault: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();
const themeChange = (val: string) => {
  monacoRef.value.editor.setTheme(val);
};

watch(
  () => props.language,
  () => {
    monacoRef.value.editor.setModelLanguage(
      toRaw(codeEditor.value).getModel(),
      props.language
    );
  }
);

watch(
  () => props.codeDefault,
  (newVal) => {
    toRaw(codeEditor.value).setValue(newVal);
  }
);

watch(
  () => theme.value,
  () => {
    if (theme.value === "light") {
      themeChange("vs");
    } else {
      themeChange("vs-dark");
    }
  }
);
onMounted(async () => {
  if (!codeEditorRef.value) {
    return;
  }
  await initMonaco();

  codeEditor.value = monacoRef.value.editor.create(codeEditorRef.value, {
    value: props.value, //编辑器初始显示文字
    language: props.language, //语言支持自行查阅demo
    automaticLayout: true, //自动布局
    colorDecorators: true, //颜色装饰器
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs", //官方自带三种主题vs, hc-black, or vs-dark
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue()); //getValue()则是用于获取编辑器实例的内容
  });
  if (theme.value === "light") {
    themeChange("vs");
  } else {
    themeChange("vs-dark");
  }
});
</script>

<style scoped>
#code-editor {
  height: 100%;
}
</style>
