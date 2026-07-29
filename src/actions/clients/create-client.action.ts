import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { ClientFormValues } from '@/types/clients/clients.type';

export const createClientAction = async (formData: ClientFormValues) => {
  try {
    const url = '/clients';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}