import type { LoginData, SignupData } from '@/types/auth';
import api from './axios';

export const register = async (signupData: SignupData) => {
  const response = await api.post(`/auth/register`, signupData);

  return response.data;
};

export const login = async (loginData: LoginData) => {
  const response = await api.post(`/auth/login`, loginData);

  return response.data;
};
