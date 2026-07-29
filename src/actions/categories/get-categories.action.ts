import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { categoriesResponseSchema } from '@/types/categories/categories.types';

export const getCategoriesAction = async () => {
  try {
    const url = '/categories';
    const { data } = await api.get(url);
    const response = categoriesResponseSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}