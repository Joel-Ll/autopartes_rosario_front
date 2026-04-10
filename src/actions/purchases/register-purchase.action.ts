import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { PurchaseFormValues } from '@/types/purchases/purchases-type';

export const registerPurchaseAction = async (formData: PurchaseFormValues) => {
  try {
    const url = '/purchases';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}