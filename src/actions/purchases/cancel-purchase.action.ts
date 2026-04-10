import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Purchase } from '@/types/purchases/purchases-type';

export const cancelPurchaseAction = async (purchaseId: Purchase['_id']) => {
  try {
    const url = `/purchases/${purchaseId}/cancel`;
    const { data } = await api.post<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}