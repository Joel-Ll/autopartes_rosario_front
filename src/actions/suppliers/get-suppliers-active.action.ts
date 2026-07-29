import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { suppliersSelectSchema } from '@/types/suppliers/suppliers.type';

export const getSuppliersSelectAction = async () => {
  try {
    const url = `/suppliers/select`;
    const { data } = await api.get(url);
    const response = suppliersSelectSchema.safeParse(data)
    if (response.success)
      return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}