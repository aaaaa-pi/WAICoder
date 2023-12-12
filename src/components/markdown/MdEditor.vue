<template>
  <Editor
    id="d-Editor"
    :value="value"
    :mode="mode"
    :locale="zhHans"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "@/constant/MarkDownThemes/cyanosis.css";
import { Editor } from "@bytemd/vue-next";
import zhHans from "@/config/zh_Hans.json";
import "@/constant/codemirrorTheme/main.css";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const theme = computed(() => store.state.theme.theme);
/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}
const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
});

// 改变markdownTheme的主题
const changeTheme = (theme: string) => {
  const markdownBody = document.querySelectorAll(".markdown-body");
  if (theme === "dark") {
    markdownBody.forEach((item: Element) => {
      item.classList.add("__dark");
    });
  } else {
    markdownBody.forEach((item: Element) => {
      item.classList.remove("__dark");
    });
  }
};
const editorTheme = async () => {
  if (theme.value === "dark") {
    document.querySelector("html")!.style.backgroundColor = "#0e0e0e";
    changeTheme("dark");
    // toolbar 部分
    document
      .querySelectorAll(
        "#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-left > div.bytemd-toolbar-icon > svg"
      )
      .forEach((item: Element) => {
        (item as HTMLElement).style.color = "#FFF";
      });
    document
      .querySelectorAll(
        "#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div.bytemd-toolbar-icon > svg"
      )
      .forEach((item: Element) => {
        (item as HTMLElement).style.color = "#FFF";
      });
    let css = await import("@/constant/codemirrorTheme/monokai");
    let markdownThemeStyleElement = document.querySelector("#codemirrorTheme");
    if (markdownThemeStyleElement) {
      markdownThemeStyleElement.innerHTML = css.default;
    } else {
      markdownThemeStyleElement = document.createElement("style");
      markdownThemeStyleElement.id = "codemirrorTheme";
      markdownThemeStyleElement.innerHTML = css.default;
      document.head.appendChild(markdownThemeStyleElement);
    }
  } else {
    document.querySelector("html")!.style.backgroundColor = "#FFF";
    changeTheme("light");
    document
      .querySelectorAll(
        "#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-left > div.bytemd-toolbar-icon > svg"
      )
      .forEach((item: Element) => {
        (item as HTMLElement).style.color = "#000";
      });
    document
      .querySelectorAll(
        "#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div.bytemd-toolbar-icon > svg"
      )
      .forEach((item: Element) => {
        (item as HTMLElement).style.color = "#000";
      });
    let css = await import("@/constant/codemirrorTheme/default");
    let markdownThemeStyleElement = document.querySelector("#codemirrorTheme");
    if (markdownThemeStyleElement) {
      markdownThemeStyleElement.innerHTML = css.default;
    } else {
      markdownThemeStyleElement = document.createElement("style");
      markdownThemeStyleElement.id = "codemirrorTheme";
      markdownThemeStyleElement.innerHTML = css.default;
      document.head.appendChild(markdownThemeStyleElement);
    }
  }
};
onMounted(async () => {
  const bytemdElement = document.getElementsByClassName("bytemd")[0];
  let observer = new MutationObserver((e) => {
    if (theme.value === "dark") {
      let toolbarRightSvgEl = document.querySelectorAll(
        "#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div > svg"
      );
      let fullscreenSvgEl = toolbarRightSvgEl[4] as HTMLElement;
      fullscreenSvgEl.style.color = "#fff";
    }
  });
  observer.observe(bytemdElement, {
    attributes: true,
  });
  await editorTheme();
});
watch(
  () => theme.value,
  async () => {
    await editorTheme();
  }
);
</script>

<style scoped>
:deep(.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child) {
  display: none;
}
:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}
:deep(.bytemd-status) {
  display: flex;
  justify-content: space-between;
}
</style>
