import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { supplierSchema, type Supplier } from '@/types/suppliers/suppliers.type';

export const getSupplierAction = async (supplierId: Supplier['_id']) => {
  try {
    const url = `/suppliers/${supplierId}`;
    const { data } = await api.get(url);
    const response = supplierSchema.safeParse(data)
    if (response.success)
      return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}