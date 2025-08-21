<template>
  <div class="container">
    <list-header @trigger-alert="handleAlert"></list-header>
    <app-alert v-if="showAlert" v-bind="alertProps" @after-leave="showAlert = false" />
    <div class="main-content">
      <lists-view class="left-panel" @trigger-alert="handleAlert"></lists-view>
      <list-items class="right-panel" @trigger-alert="handleAlert"></list-items>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import ListsView from '@/components/list/ListsView.vue';
import ListItems from '@/components/list/ListItems.vue';
import ListHeader from '@/components/list/ListHeader.vue';
import AppAlert from '@/components/layout/AppAlert.vue';
import { useListStore } from '@/stores/list';
import type { AlertProps } from '@/types/common';

const listStore = useListStore();

const { lists, selectedList } = storeToRefs(listStore);

const showAlert = ref(false);
const alertProps = ref({
  title: '',
  message: '',
  type: '',
  duration: 3000,
});

onMounted(async () => {
  const isListLoaded = await listStore.loadLists();

  if (isListLoaded && lists.value.length > 0) {
    selectedList.value = lists.value[0];
    const isListItemsLoaded = await listStore.loadListItems(selectedList.value.id);
    if (!isListItemsLoaded) {
      alertProps.value = {
        title: 'Error',
        message: `There was an error loading the list items!`,
        type: 'error',
        duration: 3000,
      };
      showAlert.value = true;
    }
  }
});

const handleAlert = (props: AlertProps) => {
  alertProps.value = props;
  showAlert.value = true;
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-color: $seasalt;
}
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  justify-content: space-around;
}

.left-panel {
  flex: 3;
  margin: 2rem 2rem;
}
.right-panel {
  flex: 7;
  margin: 2rem 2rem;
}
</style>
