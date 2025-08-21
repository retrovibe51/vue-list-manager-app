import { createRouter, createWebHistory } from 'vue-router';

import ListManager from '@/pages/ListManager.vue';
import UserSignup from '@/pages/UserSignup.vue';
import UserLogin from '@/pages/UserLogin.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/list-manager' },
    { path: '/list-manager', component: ListManager, meta: { requiresAuth: true } },
    { path: '/signup', component: UserSignup },
    { path: '/login', component: UserLogin },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
