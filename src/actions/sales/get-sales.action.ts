import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { salesResponseSchema  } from '@/types/sales/sales.type';

interface Params {
  fromDate?: string;
  toDate?: string;
}

export const getSalesAction = async ({fromDate, toDate}: Params) => {
  try {
    const params: Record<string, string> = {};
    if(fromDate) params.fromDate = fromDate;
    if(toDate) params.toDate = toDate;
    const {data} = await api.get('/sales', {params});
    const response = salesResponseSchema.safeParse(data);
    if(response.success) 
      return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}