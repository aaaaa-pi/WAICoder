<template>
  <div id="basicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
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
  background: #f7f8fa;
  padding: 20px;
}
#basicLayout .footer {
  /* background: #efefef; */
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
</style>
