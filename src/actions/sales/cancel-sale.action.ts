import { isAxiosError } from 'axios';
import api from '@/lib/axios';

export const cancelSaleAction = async (saleId: string) => {
  try {
    const url = `/sales/${saleId}/cancel`;
    const {data} = await api.post<string>(url);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}