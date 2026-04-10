import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { PurchaseFormValues } from '@/types/purchases/purchases-type';

type EditPurchaseParams = {
  purchaseId: string;
  formData: PurchaseFormValues
};

export const editPurchaseAction = async ({purchaseId, formData}: EditPurchaseParams) => {
  try {
    const url = `/purchases/${purchaseId}`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}