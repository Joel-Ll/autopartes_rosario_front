import { isAxiosError } from 'axios';
import api from '@/lib/axios';

type RemoveItemParams = {
  purchaseId: string;
  productId: string;
  index: number;
};

export const removeItems = async ({purchaseId, productId}: RemoveItemParams) => {
  try {
    const url = `/purchases/${purchaseId}/remove-item`;
    const { data } = await api.post<string>(url, {productId});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}