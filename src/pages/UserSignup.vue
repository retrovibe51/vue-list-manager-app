<template>
  <app-alert v-if="showAlert" v-bind="alertProps" @after-leave="showAlert = false"></app-alert>
  <section>
    <auth-card>
      <template #header>SIGNUP</template>
      <template #form>
        <div class="form-control" :class="{ invalid: !fieldValidity.userName }">
          <label for="userName">Username</label>
          <div class="input-group">
            <input
              type="text"
              id="firstname"
              v-model.trim="userName"
              @blur="clearValidity('userName')"
            />
            <p v-if="!fieldValidity.userName" class="error-message">
              The Username field must not be empty.
            </p>
          </div>
        </div>
        <div class="form-control" :class="{ invalid: !fieldValidity.email }">
          <label for="email">Email</label>
          <div class="input-group">
            <input type="email" id="email" v-model.trim="email" @blur="clearValidity('email')" />
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
            />
            <p v-if="!fieldValidity.password" class="error-message">
              The Password field must not be empty and must have an uppercase, lowercase and numeric
              character.
            </p>
          </div>
        </div>
        <div class="form-control" :class="{ invalid: !fieldValidity.confirmPassword }">
          <label for="confirmPassword">Confirm Password</label>
          <div class="input-group">
            <input
              type="password"
              id="confirmPassword"
              v-model.trim="confirmPassword"
              @blur="clearValidity('confirmPassword')"
            />
            <p v-if="!fieldValidity.confirmPassword" class="error-message">
              The Confirm Password field must not be empty and must have an uppercase, lowercase and
              numeric character.
            </p>
          </div>
        </div>
        <p v-if="!isFormValid" class="error-message">
          Please fix the above errors and submit again.
        </p>
      </template>
      <template #footer>
        <base-button @click="signup">Signup</base-button>
      </template>
    </auth-card>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useAuthStore } from '@/stores/auth';
import type { SignupData, SignupFormField } from '@/types/auth';
import AuthCard from '@/components/auth/AuthCard.vue';
import AppAlert from '@/components/layout/AppAlert.vue';
import { useRouter } from 'vue-router';

const userName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isFormValid = ref(true);

const fieldValidity = ref<Record<SignupFormField, boolean>>({
  userName: true,
  email: true,
  password: true,
  confirmPassword: true,
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

const signup = async () => {
  validateForm();

  if (!isFormValid.value) {
    return;
  }

  if (password.value !== confirmPassword.value) {
    alertProps.value = {
      title: 'Error',
      message: `The entered passwords do not match!`,
      type: 'error',
      duration: 3000,
    };
    showAlert.value = true;

    return;
  }

  const signupData: SignupData = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };
  const isUserRegistered = await authStore.registerUser(signupData);

  if (isUserRegistered) {
    alertProps.value = {
      title: 'Signed up successfully',
      message: `Please login to use the app!`,
      type: 'success',
      duration: 1500,
    };
    showAlert.value = true;

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } else {
    alertProps.value = {
      title: 'Error',
      message: `There was an error signing up!`,
      type: 'error',
      duration: 1500,
    };
    showAlert.value = true;
  }
};

const validateForm = function () {
  isFormValid.value = true;

  if (userName.value === '') {
    fieldValidity.value['userName'] = false;
    isFormValid.value = false;
  }

  if (email.value === '') {
    fieldValidity.value['email'] = false;
    isFormValid.value = false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (password.value === '' || !passwordRegex.test(password.value)) {
    fieldValidity.value['password'] = false;
    isFormValid.value = false;
  }

  if (confirmPassword.value === '' || !passwordRegex.test(confirmPassword.value)) {
    fieldValidity.value['confirmPassword'] = false;
    isFormValid.value = false;
  }
};

const clearValidity = (input: SignupFormField) => {
  fieldValidity.value[input] = true;
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
