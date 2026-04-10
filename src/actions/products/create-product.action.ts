import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { ProductFormValues } from '@/types/products/products.type';

export const createProductAction = async (formData: ProductFormValues) => {
  try {
    const url = '/products';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}