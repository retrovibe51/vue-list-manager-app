<template>
  <input type="text" />
</template>

<style lang="scss">
input {
  background-color: $white;
  border: 1px solid $frenchGray;
  border-radius: 4px;
  padding: 8px 12px;
}
input::placeholder {
  color: $cadetGray2;
}
input:focus {
  background-color: $royalBlue2;
}
</style>
