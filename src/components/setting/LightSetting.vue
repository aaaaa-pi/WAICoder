<template>
  <a-dropdown>
    <label class="setting">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        class="settingIcon"
      >
        <g fill="none">
          <path
            d="M13.314 7.565l-.136.126l-10.48 10.488a2.27 2.27 0 0 0 3.211 3.208L16.388 10.9a2.251 2.251 0 0 0-.001-3.182l-.157-.146a2.25 2.25 0 0 0-2.916-.007zm-.848 2.961l1.088 1.088l-8.706 8.713a.77.77 0 1 1-1.089-1.088l8.707-8.713zm4.386 4.48L16.75 15a.75.75 0 0 0-.743.648L16 15.75v.75h-.75a.75.75 0 0 0-.743.648l-.007.102c0 .38.282.694.648.743l.102.007H16v.75c0 .38.282.694.648.743l.102.007a.75.75 0 0 0 .743-.648l.007-.102V18h.75a.75.75 0 0 0 .743-.648L19 17.25a.75.75 0 0 0-.648-.743l-.102-.007h-.75v-.75a.75.75 0 0 0-.648-.743L16.75 15l.102.007zm-1.553-6.254l.027.027a.751.751 0 0 1 0 1.061l-.711.713l-1.089-1.089l.73-.73a.75.75 0 0 1 1.043.018zM6.852 5.007L6.75 5a.75.75 0 0 0-.743.648L6 5.75v.75h-.75a.75.75 0 0 0-.743.648L4.5 7.25c0 .38.282.693.648.743L5.25 8H6v.75c0 .38.282.693.648.743l.102.007a.75.75 0 0 0 .743-.648L7.5 8.75V8h.75a.75.75 0 0 0 .743-.648L9 7.25a.75.75 0 0 0-.648-.743L8.25 6.5H7.5v-.75a.75.75 0 0 0-.648-.743L6.75 5l.102.007zm12-2L18.75 3a.75.75 0 0 0-.743.648L18 3.75v.75h-.75a.75.75 0 0 0-.743.648l-.007.102c0 .38.282.693.648.743L17.25 6H18v.75c0 .38.282.693.648.743l.102.007a.75.75 0 0 0 .743-.648l.007-.102V6h.75a.75.75 0 0 0 .743-.648L21 5.25a.75.75 0 0 0-.648-.743L20.25 4.5h-.75v-.75a.75.75 0 0 0-.648-.743L18.75 3l.102.007z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </label>
    <template #content>
      <ul class="menu">
        <li class="menuTitle">切换明暗</li>
        <li class="menuItem">
          <a-button type="text" @click="toggleLight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </a-button>
          <a-button type="text" @click="toggleDark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </a-button>
        </li>
      </ul>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const isLight = ref();
const theme = computed(() => store.state.theme.theme);
const toggleLight = () => {
  isLight.value = true;
  // 恢复亮色主题
  document.body.removeAttribute("arco-theme");
  localStorage.setItem("theme", "light");
  store.commit("theme/toggleTheme", "light");
};
const toggleDark = () => {
  isLight.value = false;
  // 设置为暗黑主题
  document.body.setAttribute("arco-theme", "dark");
  localStorage.setItem("theme", "dark");
  store.commit("theme/toggleTheme", "dark");
};
onMounted(() => {
  if (theme.value === "light") {
    toggleLight();
  } else {
    toggleDark();
  }
});
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  padding: 0;
  list-style: none;
}
.menuTitle {
  margin: 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  opacity: 0.6;
  color: rgb(var(--gray-10));
}
.setting {
  display: inline-block;
  padding: 5px;
  width: 22px;
  height: 22px;
  cursor: pointer;
}
.settingIcon {
  color: var(--color-text-1);
  /* color: #0a65cc; */
}
.setting:hover {
  background-color: var(--color-neutral-3);
}
.menu {
  display: flex;
  flex-direction: column;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
