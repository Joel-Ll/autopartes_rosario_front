import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Product } from '@/types/products/products.type';

export const deleteProductAction = async (productId: Product['_id']) => {
  try {
    const url = `/products/${productId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}