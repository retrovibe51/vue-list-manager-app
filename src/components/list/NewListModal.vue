<template>
  <teleport to="body">
    <div @click="$emit('close')"></div>
    <dialog open>
      <header>
        <h3>New List</h3>
      </header>
      <section>
        <label for="listName">List name</label>
        <input
          type="text"
          name="listName"
          id="listName"
          v-model="newListName"
          @keydown.enter="addNewList"
        />
      </section>
      <menu>
        <base-button class="horizontal-padding" @click="$emit('close')">Cancel</base-button>
        <base-button class="horizontal-padding" @click="addNewList">Add</base-button>
      </menu>
    </dialog>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import BaseButton from '../ui/BaseButton.vue';

const newListName = ref('');

const emit = defineEmits<{
  (e: 'addNewList', newListName: string): void;
  (e: 'close'): void;
}>();

const addNewList = () => {
  if (newListName.value) {
    emit('addNewList', newListName.value);
    newListName.value = '';
  }
};
</script>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  background-color: $gunmetal;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h3 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

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

.horizontal-padding {
  margin: 0 5px;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
