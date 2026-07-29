import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { categoriesSelectSchema } from '@/types/categories/categories.types';

export const getCategoriesActiveAction = async () => {
  try {
    const url = `/categories/select`;
    const { data } = await api.get(url);
    const response = categoriesSelectSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}