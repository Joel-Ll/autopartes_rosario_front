import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { purchasesResponse } from '@/types/purchases/purchases-type';

export const getPurchasesAction = async () => {
  try {
    const url = '/purchases';
    const { data } = await api.get(url);
    const result = purchasesResponse.safeParse(data);
    if (result.success)
      return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}