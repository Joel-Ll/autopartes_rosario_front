import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Supplier } from '@/types/suppliers/suppliers.type';

export const changeStatetAction = async ( supplierId: Supplier['_id']) => {
  try {
    const url = `/suppliers/state/${supplierId}`;
    const { data } = await api.post<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}