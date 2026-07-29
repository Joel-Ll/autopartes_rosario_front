import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Category } from '@/types/categories/categories.types';

export const changeStatetAction = async ( categoryId: Category['_id']) => {
  try {
    const url = `/categories/state/${categoryId}`;
    const { data } = await api.post<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}