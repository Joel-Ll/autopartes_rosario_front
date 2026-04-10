import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Category, CategoryFormValues } from '@/types/categories/categories.types';

interface ICategoryAPI {
  categoryId: Category['_id'];
  formData: CategoryFormValues
}

export const updateCategoryAction = async ({categoryId, formData}: ICategoryAPI) => {
  try {
    const url = `/categories/${categoryId}`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}