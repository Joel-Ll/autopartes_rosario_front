import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { purchaseSchema } from '@/types/purchases/purchases-type';

export const getPurchaseAction = async (purchaseId: string) => {
  try {
    const url = `/purchases/${purchaseId}`;
    const { data } = await api.get(url);
    const result = purchaseSchema.safeParse(data);
    if (result.success)
      return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}