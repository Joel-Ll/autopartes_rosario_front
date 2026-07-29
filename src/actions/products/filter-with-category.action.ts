import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { filteredProducts } from '@/types/products/products.type';

export const filterWithCategoryAction = async (findOption: string) => {
  try {
    const url = '/products/filtered';
    const { data } = await api.post(url, { findOption });
    const response = filteredProducts.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}