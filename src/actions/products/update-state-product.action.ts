import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Product } from '@/types/products/products.type';

export const changeStatetAction = async (productId: Product['_id']) => {
  try {
    const url = `/products/state/${productId}`;
    const { data } = await api.post<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}