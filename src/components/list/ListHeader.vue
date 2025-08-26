<template>
  <new-list-modal
    v-if="isAddListModalOpen"
    @close="isAddListModalOpen = false"
    @addNewList="addNewList"
  ></new-list-modal>
  <section>
    <div>
      <label class="font-20"><b>Lists</b></label>
      <base-button @click="openNewListModal">+ New List</base-button>
    </div>
    <div class="blank-space"></div>
    <div>
      <label for="sorting">Sorting</label>
      <select name="sorting" id="sorting" v-model="listStore.sortType" @change="onSortChange">
        <option :value="SortType.DATE_ASC">DATE ASC</option>
        <option :value="SortType.DATE_DESC">DATE DESC</option>
        <option :value="SortType.NAME_ASC">NAME ASC</option>
        <option :value="SortType.NAME_DESC">NAME DESC</option>
      </select>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import NewListModal from './NewListModal.vue';
import BaseButton from '../ui/BaseButton.vue';
import { useListStore } from '@/stores/list';
import { SortType } from '@/types/sorting';

const listStore = useListStore();

const isAddListModalOpen = ref(false);

const emit = defineEmits(['trigger-alert']);

const openNewListModal = () => {
  isAddListModalOpen.value = true;
};

const addNewList = async (newListName: string) => {
  const isListAdded = await listStore.addNewList(newListName);
  if (isListAdded) {
    emit('trigger-alert', {
      title: 'List added',
      message: `The list has been added successfully!`,
      type: 'success',
      duration: 3000,
    });
    listStore.loadLists();
  } else {
    emit('trigger-alert', {
      title: 'Error',
      message: `There was an error adding the list!`,
      type: 'error',
      duration: 3000,
    });
  }
  isAddListModalOpen.value = false;
};

const onSortChange = () => {
  listStore.sortListItems();
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  margin: 1rem 2rem;
}
.blank-space {
  flex: 6;
}

select {
  padding: 5px;
  border-radius: 4px;
  background-color: $white;
  border: 2px solid $frenchGray;
}
.font-20 {
  font-size: 20px;
}
</style>
