import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Client } from '@/types/clients/clients.type';

export const changeStatetAction = async ( clientId: Client['_id']) => {
  try {
    const url = `/clients/state/${clientId}`;
    const { data } = await api.post<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}