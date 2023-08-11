<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted, toRaw } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }

  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value, //编辑器初始显示文字
    language: "java", //语言支持自行查阅demo
    automaticLayout: true, //自动布局
    colorDecorators: true, //颜色装饰器
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark", //官方自带三种主题vs, hc-black, or vs-dark
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue()); //getValue()则是用于获取编辑器实例的内容
  });
});
</script>

<style scoped></style>
