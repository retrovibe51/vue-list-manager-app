<template>
  <app-alert v-if="showAlert" v-bind="alertProps" @after-leave="showAlert = false"></app-alert>
  <section>
    <auth-card>
      <template #header>LOGIN</template>
      <template #form>
        <div class="form-control" :class="{ invalid: !fieldValidity.email }">
          <label for="email">Email</label>
          <div class="input-group">
            <input
              type="email"
              id="email"
              v-model.trim="email"
              @blur="clearValidity('email')"
              @keydown.enter="login"
            />
            <p v-if="!fieldValidity.email" class="error-message">
              The Email field must not be empty.
            </p>
          </div>
        </div>
        <div class="form-control" :class="{ invalid: !fieldValidity.password }">
          <label for="password">Password</label>
          <div class="input-group">
            <input
              type="password"
              id="password"
              v-model.trim="password"
              @blur="clearValidity('password')"
              @keydown.enter="login"
            />
            <p v-if="!fieldValidity.password" class="error-message">
              The Password field must not be empty and must have an uppercase, lowercase and numeric
              character.
            </p>
          </div>
        </div>
        <p v-if="!isFormValid" class="error-message">
          Please fix the above errors and submit again.
        </p>
      </template>
      <template #footer>
        <base-button @click="login">Login</base-button>
      </template>
      <button @click="logout">LOGOUT</button>
    </auth-card>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useAuthStore } from '@/stores/auth';
import type { LoginData, LoginFormField } from '@/types/auth';
import AuthCard from '@/components/auth/AuthCard.vue';
import AppAlert from '@/components/layout/AppAlert.vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const isFormValid = ref(true);

const fieldValidity = ref<Record<LoginFormField, boolean>>({
  email: true,
  password: true,
});

const showAlert = ref(false);
const alertProps = ref({
  title: '',
  message: '',
  type: 'info',
  duration: 3000,
});

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  validateForm();

  if (!isFormValid.value) {
    return;
  }

  const loginData: LoginData = {
    email: email.value,
    password: password.value,
  };
  const isLoginSuccess = await authStore.loginUser(loginData);

  if (isLoginSuccess) {
    alertProps.value = {
      title: 'Login Successful',
      message: `Welcome back!`,
      type: 'success',
      duration: 1500,
    };
    showAlert.value = true;

    setTimeout(() => {
      router.push('/list-manager');
    }, 1500);
  } else {
    alertProps.value = {
      title: 'Login Failure',
      message: `There was an error logging in!`,
      type: 'error',
      duration: 3000,
    };
    showAlert.value = true;
  }
};

const validateForm = function () {
  isFormValid.value = true;

  if (email.value === '') {
    fieldValidity.value['email'] = false;
    isFormValid.value = false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (password.value === '' && !passwordRegex.test(password.value)) {
    fieldValidity.value['password'] = false;
    isFormValid.value = false;
  }
};

const clearValidity = (input: LoginFormField) => {
  fieldValidity.value[input] = true;
};

const logout = () => {
  authStore.logoutUser();
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: $seasalt;
}
</style>
