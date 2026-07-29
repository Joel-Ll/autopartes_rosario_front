import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Client, ClientFormValues } from '@/types/clients/clients.type';

interface APIParams {
  formData: ClientFormValues,
  clientId: Client['_id']
}

export const editClientAction = async ({formData, clientId}: APIParams) => {
  try {
    const url = `/clients/${clientId}`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}