import { defineStore } from 'pinia';
import { ref } from 'vue';

import { addListItem, getListById, getLists, addList, deleteList, deleteListItem } from '@/api/lists';
import type { List, ListItem } from '@/types/list';
import { SortType } from '@/types/sorting';

export const useListStore = defineStore('list', () => {

  const lists = ref<List[]>([]);
  const selectedList = ref<List | null>(null);
  const listItems = ref<ListItem[]>([]);
  const isListsLoading = ref(false);
  const isListItemsLoading = ref(false);
  const sortType = ref<SortType>(SortType.NAME_ASC);

  const loadLists = async (): Promise<boolean> => {
    isListsLoading.value = true;
    try {
      const data = await getLists();
      lists.value = data;
      isListsLoading.value = false;
      return true;
    } catch (error) {
      isListsLoading.value = false;
      return false;
    }
  };

  const loadListItems = async (id: number): Promise<boolean> => {
    isListItemsLoading.value = true;
    try {
      const data = await getListById(id);
      listItems.value = data.list_items;
      if(sortType.value !== SortType.NAME_ASC) {
        sortListItems();
      }
      isListItemsLoading.value = false;
      return true;
    } catch (error) {
      isListItemsLoading.value = false;
      return false;
    }
  };

  const addNewList = async (name: string): Promise<boolean> => {
    try {
      await addList(name);
      return true;
    } catch (error) {
      return false;
    }
  };

  const addItemToList = async (listId: number, name: string): Promise<boolean> => {
    try {
      await addListItem(listId, name);
      return true;
    } catch (error) {
      return false;
    }
  };

  const removeList = async (id: number): Promise<boolean> => {
    try {
      await deleteList(id);
      return true;
    } catch (error) {
      return false;
    }
  };

  const removeItemFromList = async (id: number, listItemId: number): Promise<boolean> => {
    try {
      await deleteListItem(id, listItemId);
      return true;
    } catch (error) {
      return false;
    }
  };

  const sortListItems = () => {
    switch (sortType.value) {
      case SortType.NAME_ASC:
        listItems.value.sort((item1, item2) => item1.name.localeCompare(item2.name));
        break;
      case SortType.NAME_DESC:
        listItems.value.sort((item1, item2) => item2.name.localeCompare(item1.name));
        break;
      case SortType.DATE_ASC:
        listItems.value.sort((item1, item2) => item1.id - item2.id);
        break;
      case SortType.DATE_DESC:
        listItems.value.sort((item1, item2) => item2.id - item1.id);
        break;
    }
  }

  return {
    lists,
    selectedList,
    listItems,
    isListsLoading,
    isListItemsLoading,
    sortType,
    loadLists,
    loadListItems,
    addNewList,
    addItemToList,
    removeList,
    removeItemFromList,
    sortListItems
  };
});
