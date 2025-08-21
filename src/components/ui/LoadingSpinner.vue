<template>
  <div class="loading-spinner-container">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  border: 7px solid $cadetGray2;
  border-radius: 50%;
  border-top: 7px solid $azure;
  width: 20px;
  height: 20px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
