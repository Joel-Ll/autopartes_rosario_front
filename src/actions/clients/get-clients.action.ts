import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { clientsResponseSchema } from '@/types/clients/clients.type';

export const getClientsAction = async () => {
  try {
    const url = '/clients';
    const { data } = await api.get(url);
    const response = clientsResponseSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}