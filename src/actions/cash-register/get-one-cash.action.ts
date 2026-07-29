import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { cashRegisterResponseSchema, type Cash } from '@/types/cash-register/cash-register.type';

export const getOneCashAction = async (cashId: Cash['_id']) => {
  try {
    const url = `/cash-register/${cashId}`;
    const { data } = await api.get(url);
    const response = cashRegisterResponseSchema.safeParse(data);
    if (response.success)
      return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}