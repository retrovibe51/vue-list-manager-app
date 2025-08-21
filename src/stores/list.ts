import { defineStore } from 'pinia';
import { ref } from 'vue';

import { addListItem, getListById, getLists, addList, deleteList, deleteListItem } from '@/api';
import type { List, ListItem } from '@/types/list';

export const useListStore = defineStore('list', () => {
  // const lists = ref<List[]>([
  //   {
  //     id: 477,
  //     name: 'Test List',
  //     userId: 322,
  //     // list_items: [
  //     //   {
  //     //     id: 3282,
  //     //     name: 'List A',
  //     //     listId: 477,
  //     //   },
  //     //   {
  //     //     id: 3284,
  //     //     name: 'List C',
  //     //     listId: 477,
  //     //   },
  //     //   {
  //     //     id: 3285,
  //     //     name: 'List Eee',
  //     //     listId: 477,
  //     //   },
  //     //   {
  //     //     id: 3289,
  //     //     name: 'List Eee',
  //     //     listId: 477,
  //     //   },
  //     // ],
  //   },
  //   {
  //     id: 479,
  //     name: 'New List',
  //     userId: 322,
  //     // list_items: [
  //     //   {
  //     //     id: 3287,
  //     //     name: 'Item 1',
  //     //     listId: 479,
  //     //   },
  //     //   {
  //     //     id: 3288,
  //     //     name: 'Item 2',
  //     //     listId: 479,
  //     //   },
  //     // ],
  //   },
  // ]);

  // const selectedListId = ref(lists.value[0].id);

  // const listItems = ref<ListItem[]>([
  //   {
  //     id: 3287,
  //     name: 'Item 1',
  //     listId: 479,
  //   },
  //   {
  //     id: 3288,
  //     name: 'Item 2',
  //     listId: 479,
  //   },
  // ]);

  const lists = ref<List[]>([]);
  const selectedList = ref<List | null>(null);
  const listItems = ref<ListItem[]>([]);
  const isListsLoading = ref(false);
  const isListItemsLoading = ref(false);

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

  return {
    lists,
    selectedList,
    listItems,
    isListsLoading,
    isListItemsLoading,
    loadLists,
    loadListItems,
    addNewList,
    addItemToList,
    removeList,
    removeItemFromList,
  };
});
