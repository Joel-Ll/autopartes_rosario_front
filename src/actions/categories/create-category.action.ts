import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { CategoryFormValues } from '@/types/categories/categories.types';

export const createCategoryAction = async (formData: CategoryFormValues) => {
  try {
    const url = '/categories';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}