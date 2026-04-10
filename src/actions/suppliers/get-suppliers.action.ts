import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { suppliersSchema } from '@/types/suppliers/suppliers.type';

export const getSuppliersAction = async () => {
  try {
    const url = '/suppliers';
    const { data } = await api.get(url);
    const response = suppliersSchema.safeParse(data)
    if (response.success)
      return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}