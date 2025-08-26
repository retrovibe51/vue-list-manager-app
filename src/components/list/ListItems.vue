<template>
  <section>
    <div class="main-container">
      <div class="list-items-header">
        <loading-spinner v-if="isListItemsLoading"></loading-spinner>
        <h3 v-else>{{ selectedList?.name }} Items</h3>
      </div>
      <div class="list-items-container">
        <loading-spinner v-if="isListItemsLoading"></loading-spinner>
        <ul v-else>
          <li v-for="item in listItems" :key="item.id">
            <span class="list-name">{{ item.name }}</span>
            <button class="btn-delete" @click="deleteListItem(item.listId, item.id)">X</button>
          </li>
        </ul>
      </div>
      <div class="new-list-item-container">
        <input
          type="text"
          placeholder="new item name"
          @keyup.enter="onListItemEnter"
          v-model="itemName"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import { useListStore } from '@/stores/list';

const listStore = useListStore();

const { listItems, selectedList, isListItemsLoading } = storeToRefs(listStore);

const itemName = ref('');
const isLoading = ref(false);

const emit = defineEmits(['trigger-alert']);

const onListItemEnter = async () => {
  if (itemName.value && selectedList.value) {
    const isListItemAdded = await listStore.addItemToList(selectedList.value.id, itemName.value);
    if (isListItemAdded) {
      listStore.loadListItems(selectedList.value.id);
      emit('trigger-alert', {
        title: 'List Item added',
        message: `The item has been added to the list successfully!`,
        type: 'success',
        duration: 3000,
      });
    } else {
      emit('trigger-alert', {
        title: 'Error',
        message: `There was an error adding the item!`,
        type: 'error',
        duration: 3000,
      });
    }
    itemName.value = '';
  }
};

const deleteListItem = async (listId: number, listItemId: number) => {
  const isListItemRemoved = await listStore.removeItemFromList(listId, listItemId);
  if (isListItemRemoved) {
    emit('trigger-alert', {
      title: 'List Item deleted',
      message: `The item has been removed from the list successfully!`,
      type: 'success',
      duration: 3000,
    });
    listStore.loadListItems(listId);
  } else {
    emit('trigger-alert', {
      title: 'Error',
      message: `There was an error removing the item!`,
      type: 'error',
      duration: 3000,
    });
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: $white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.list-items-container {
  flex: 8;
  background-color: $white;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 8px;
  color: $richBlack;
  transition: all 0.5s ease;
}
li:nth-child(odd) {
  background-color: $white;
}
li:nth-child(even) {
  background-color: $seasalt2;
}
li:hover {
  background-color: #d5e0f1; //$antiFlashWhite2;
  color: $richBlack;
  transform: scale(1.01);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.list-name {
  flex-grow: 1;
}
.btn-delete {
  font-size: 14px;
  background-color: transparent;
  opacity: 0;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  padding: 4px 8px;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
li:hover .btn-delete {
  background-color: $errorRed;
  color: $white;
  opacity: 1;
  pointer-events: auto;
}
.list-items-header {
  padding: 5px 10px;
  flex: 1;
  background-color: $antiFlashWhite2;
  color: $richBlack;
  border-bottom: 1px solid $antiFlashWhite;
}
.new-list-item-container {
  display: flex;
  height: 20%;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: $antiFlashWhite2;
  border-top: 1px solid $antiFlashWhite;
}
.new-list-item-container input {
  background-color: $white;
  border: 1px solid $frenchGray;
  border-radius: 4px;
  padding: 8px 12px;
}
.new-list-item-container input::placeholder {
  color: $cadetGray2;
}
.new-list-item-container input:focus {
  background-color: $royalBlue2;
}
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
