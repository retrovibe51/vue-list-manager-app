import axios from 'axios';
import api from './axios';

import type { SortItemsBy, SortItemsDir } from '@/types/sorting';

export const getLists = async () => {
  const response = await api.get(`/List`);

  return response.data;
};

export const getListById = async (id: number) => {
  const response = await api.get(`/List/${id}`);

  return response.data;
};

export const addList = async (name: string) => {
  const response = await api.post(`/List`, { name: name, list_items: [] });

  return response.data;
};

export const addListItem = async (listId: number, name: string) => {
  const response = await api.post(`/List/${listId}/list-item`, { name: name });

  return response.data;
};

export const deleteList = async (id: number) => {
  const response = await api.delete(`/List/${id}`);

  return response.data;
};

export const deleteListItem = async (id: number, listItemId: number) => {
  const response = await api.delete(`/List/${id}/list-item/${listItemId}`);

  return response.data;
};
