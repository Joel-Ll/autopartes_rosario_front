import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { cashRegistersResponseSchema } from '@/types/cash-register/cash-register.type';

export const getAllCaschAction = async () => {
  try {
    const url = '/cash-register';
    const { data } = await api.get(url);
    const response = cashRegistersResponseSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}