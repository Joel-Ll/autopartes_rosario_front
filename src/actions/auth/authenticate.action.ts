import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { LoginForm } from '@/types/auth/auth.types';

export const authenticateAction = async (formData: LoginForm) => {
  try {
    const url = '/auth/login';
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem('AUTH_TOKEN', data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}