import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { CashRegisterFormValues } from '@/types/cash-register/cash-register.type';

export const createCashAction = async (formData: CashRegisterFormValues) => {
  try {
    const url = '/cash-register';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}