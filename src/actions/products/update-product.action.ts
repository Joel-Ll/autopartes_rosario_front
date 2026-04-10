import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Product, ProductFormValues } from '@/types/products/products.type';

interface ICategoryAPI {
  productId: Product['_id'];
  formData: ProductFormValues
}

export const updateProductAction = async ({ productId, formData }: ICategoryAPI) => {
  try {
    const url = `/products/${productId}`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}