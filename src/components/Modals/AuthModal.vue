<template>
  <div id="dialog">
    <a-modal v-model:visible="visible" @cancel="cancel" hide-cancel>
      <template v-if="loginState">
        <Login />
      </template>
      <template v-if="SignUpState">
        <SignUp />
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import Login from "./Login.vue";
import SignUp from "./SignUp.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const visible = computed(
  () => Object.keys(store.state.auth.modals).length !== 0
);
// 弹窗状态
const loginState = computed(() => store.state.auth.modals.login);
const SignUpState = computed(() => store.state.auth.modals.signup);

const cancel = () => {
  store.commit("auth/clearModal");
};
</script>

<style>
.arco-modal-header {
  justify-content: end;
}
.arco-modal-footer {
  display: none;
}
.arco-modal {
  max-width: 24.5rem;
}
</style>
