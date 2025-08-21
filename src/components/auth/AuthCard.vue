<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <form @submit.prevent>
      <slot name="form"></slot>
    </form>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.card {
  background-color: $white;
  color: $black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 450px;
  min-height: 330px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.form-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: $gunmetal;
  color: $white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  flex-grow: 1;
}

.form-control {
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
  width: 40%;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 60%;
}

input {
  border: 1px solid #ccc;
  font: inherit;
  background-color: $white;
  border: 1px solid $frenchGray;
  border-radius: 4px;
  padding: 8px 12px;
}

input:focus {
  background-color: $royalBlue2;
  outline: none;
  border-color: $frenchGray;
}

.invalid input {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 10px;
  margin-top: 0.25rem;
}
</style>
