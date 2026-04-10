import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Supplier, SupplierFormValues } from '@/types/suppliers/suppliers.type';

interface ISupplierAPI {
  supplierId: Supplier['_id'];
  formData: SupplierFormValues
}

export const updateSuplierAction = async ({supplierId, formData}: ISupplierAPI) => {
  try {
    const url = `/suppliers/${supplierId}`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}