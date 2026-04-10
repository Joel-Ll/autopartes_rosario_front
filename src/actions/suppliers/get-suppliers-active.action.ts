import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { suppliersActiveSchema } from '@/types/suppliers/suppliers.type';

export const getSuppliersActiveAction = async () => {
  try {
    const url = `/suppliers/active`;
    const { data } = await api.get(url);
    const response = suppliersActiveSchema.safeParse(data)
    if (response.success)
      return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}