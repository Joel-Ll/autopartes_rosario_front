import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { clientSchema, type Client } from '@/types/clients/clients.type';

export const getClientAction = async (clientId: Client['_id']) => {
  try {
    const url = `/clients/${clientId}`;
    const { data } = await api.get(url);
    const response = clientSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}