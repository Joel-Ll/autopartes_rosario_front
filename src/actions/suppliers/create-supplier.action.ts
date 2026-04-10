import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { SupplierFormValues } from '@/types/suppliers/suppliers.type';

export const createSupplierAction = async (formData: SupplierFormValues) => {
  try {
    const url = '/suppliers';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}