<template>
  <div id="basicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <div class="contentMask">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer class="footer">
        <p class="footer-info">© 2023 Eureka</p>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from "../components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

#basicLayout .header {
}

#basicLayout .content {
  flex: 1;
  background-image: url("@/assets/common-background.png");
}
#basicLayout .content .contentMask {
  height: 100%;
  padding: 20px;
  background-color: rgba(217, 217, 217, 0.4);
}
#basicLayout .footer {
  background: #fff;
  padding: 6px;
  margin-top: auto;
  text-align: center;
  border-top: 1px solid #eee;
}

#basicLayout .footer .footer-info {
  /* © 2023 Eureka */
  color: rgb(101, 117, 139);
  font-family: 思源黑体;
  font-size: 10px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0px;
}

:deep(.arco-table-th) {
  background-color: #0a65cc;
  color: #fff;
}
:deep(.arco-table-container) {
  border-bottom: 4px solid #0a65cc;
  padding-bottom: 10px;
}
</style>
