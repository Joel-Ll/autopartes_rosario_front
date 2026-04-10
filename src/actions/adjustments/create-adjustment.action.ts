import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { AdjustmentsFormValues } from '@/types/adjustments/adjustments.type';

export const createAdjustementAction = async (formData: AdjustmentsFormValues) => {
  try {
    const url = '/adjustments';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}