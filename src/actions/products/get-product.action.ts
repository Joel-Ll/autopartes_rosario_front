import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { productSchema, type Product } from '@/types/products/products.type';

export const getProductAction = async (productId: Product['_id']) => {
  try {
    const url = `/products/${productId}`;
    const { data } = await api.get(url);
    const response = productSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}