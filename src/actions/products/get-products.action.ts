import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { productsResponseSchema } from '@/types/products/products.type';

export const getProductsAction = async () => {
  try {
    const url = '/products';
    const { data } = await api.get(url);
    const response = productsResponseSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}