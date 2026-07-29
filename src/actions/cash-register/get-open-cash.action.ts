import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { cashOpenSchema } from '@/types/cash-register/cash-register.type';

export const getOpenCashAction = async () => {
  try {
    const { data } = await api.get('/cash-register/status/open');
    const response = cashOpenSchema.safeParse(data);
    return response.success ? response.data : null;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
    }
    throw error;
  }
}