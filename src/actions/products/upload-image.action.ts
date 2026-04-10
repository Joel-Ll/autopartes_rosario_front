import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { CloudinaryResponse } from '@/types/images/image.types';

export const uploadImageAction = async (formData: FormData) => {
  try {
    const url = '/products/upload-image';
    const { data } = await api.post<CloudinaryResponse>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}