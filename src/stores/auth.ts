import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { LoginData, SignupData } from '@/types/auth';
import { login, register } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('x-access-token'));

  const isAuthenticated = computed(() => !!accessToken.value);

  const setAccessToken = (token: string) => {
    accessToken.value = token;
    localStorage.setItem('x-access-token', token);
  };

  const clearAccessToken = () => {
    accessToken.value = null;
    localStorage.removeItem('x-access-token');
  };

  const logoutUser = () => {
    clearAccessToken();
  };

  const loginUser = async (loginData: LoginData) => {
    try {
      const data = await login(loginData);
      setAccessToken(data.accessToken);
      return true;
    } catch (error) {
      console.error('Login failed: ', error);
      return false;
    }
  };

  const registerUser = async (signupData: SignupData) => {
    try {
      await register(signupData);
      return true;
    } catch (error) {
      console.error('Registration failed: ', error);
      return false;
    }
  };

  return { setAccessToken, loginUser, registerUser, logoutUser, isAuthenticated };
});
