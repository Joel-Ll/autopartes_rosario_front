import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { productItemsSchema } from '@/types/purchases/purchases-type';

export const getProductsItemAction = async () => {
  try {
    const url = '/products/select';
    const { data } = await api.get(url);
    const result = productItemsSchema.safeParse(data);
    if (result.success)
      return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}