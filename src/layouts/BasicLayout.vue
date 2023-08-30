<template>
  <div id="basicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
      <a-layout-footer class="footer">
        <a href="#">online judge by API</a>
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
  margin-bottom: 16px;
}
#basicLayout .footer {
  /* background: #efefef; */
  padding: 16px;
  margin-top: auto;
  text-align: center;
}
</style>
