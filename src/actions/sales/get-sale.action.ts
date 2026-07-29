import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { saleDetailSchema, type Sale } from '@/types/sales/sales.type';

export const getSaleAction = async (saleId: Sale['_id']) => {
  try {
    const url = `/sales/${saleId}`;
    const { data } = await api.get(url);
    const response = saleDetailSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}