<template>
  <section>
    <loading-spinner v-if="isListsLoading"></loading-spinner>
    <h5 v-else-if="lists.length === 0">No lists found.</h5>
    <ul v-else>
      <li
        v-for="list in lists"
        :key="list.name"
        :class="{ active: list.id === selectedList?.id }"
        @click="onListSelect(list)"
      >
        <span class="list-name">{{ list.name }}</span>
        <button class="btn-delete" @click.stop="deleteList(list.id)">X</button>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import { useListStore } from '@/stores/list';
import type { List } from '@/types/list';

const listStore = useListStore();

const { lists, selectedList, isListsLoading } = storeToRefs(listStore);

const emit = defineEmits(['trigger-alert']);

const onListSelect = async (list: List) => {
  selectedList.value = list;
  const isListItemsLoaded = await listStore.loadListItems(selectedList.value.id);

  if (!isListItemsLoaded) {
    emit('trigger-alert', {
      title: 'Error',
      message: `There was an error loading the list items!`,
      type: 'error',
      duration: 3000,
    });
  }
};

const deleteList = async (id: number) => {
  const isListDeleted = await listStore.removeList(id);

  if (isListDeleted) {
    emit('trigger-alert', {
      title: 'List deleted',
      message: `The list has been deleted successfully!`,
      type: 'success',
      duration: 3000,
    });

    await listStore.loadLists();

    if (selectedList.value?.id === id) {
      if (lists.value.length > 0) {
        selectedList.value = lists.value[0];
        await listStore.loadListItems(selectedList.value.id);
      } else {
        selectedList.value = null;
      }
    }
  } else {
    emit('trigger-alert', {
      title: 'Error',
      message: `There was an error deleting the list!`,
      type: 'error',
      duration: 3000,
    });
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: $gunmetal;
  color: $white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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
  transition: all 0.5s ease;
}
li.active {
  background-color: $azure;
  color: $white;
}
li:not(.active):hover {
  background-color: #374151;
  color: $seasalt;
  transform: scale(1.01);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.list-name {
  flex-grow: 1;
}

.btn-delete {
  font-size: 14px;
  /* background-color: rgb(125, 135, 145); */
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

h5 {
  padding: 0 20px;
}
</style>
