<template>
  <teleport to="body">
    <transition name="slide-fade" @after-leave="$emit('after-leave')">
      <div v-if="isVisible" class="alert-container">
        <div :class="['alert-box', type]">
          <h3 class="alert-header">{{ title }}</h3>
          <p class="alert-content">{{ message }}</p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Alert',
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  type: {
    type: String,
    default: 'info', // allowed values: 'success', 'error', 'info'
    validator: (value: string) => ['info', 'success', 'error', 'warning'].includes(value),
  },
});

const isVisible = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, props.duration);
});
</script>

<style lang="scss" scoped>
.alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.alert-box {
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 300px;
}
.alert-box.success {
  background-color: $successGreen;
}
.alert-box.error {
  background-color: $errorRed;
}
.alert-box.info {
  background-color: $infoBlue;
}

.alert-header {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
}

.alert-content {
  margin: 0;
  font-size: 14px;
}

/* Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
