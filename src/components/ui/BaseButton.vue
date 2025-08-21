<template>
  <button>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  background-color: $azure;
  color: $white;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 10px;
  // border: 1px solid $white;
  border: none;
  transition: all 0.2s ease;
}
button:hover {
  background-color: $royalBlue;
  transform: scale(1.02);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
