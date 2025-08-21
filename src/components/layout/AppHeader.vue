<template>
  <header>
    <div></div>
    <div class="logo">LIST MANAGER</div>
    <div class="horizontal-padding">
      <base-button @click="logout" v-if="authStore.isAuthenticated">Logout</base-button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import BaseButton from '../ui/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logoutUser();
  router.push('/login');
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $gunmetal;
}

.logo {
  color: $white;
  font-weight: bold;
  font-size: 22px;
}

.horizontal-padding {
  padding: 0 15px;
}
</style>
