import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { adjustmentsSchema } from '@/types/adjustments/adjustments.type';

export const getAdjustmentsAction = async () => {
  try {
    const url = '/adjustments';
    const { data } = await api.get(url);
    const result = adjustmentsSchema.safeParse(data);
    if (result.success)
      return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}