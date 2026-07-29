import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { categoryWithProductsSchema, type Category } from '@/types/categories/categories.types';

export const getCategoryAction = async (categoryId: Category['_id']) => {
  try {
    const url = `/categories/${categoryId}`;
    const { data } = await api.get(url);
    const response = categoryWithProductsSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}