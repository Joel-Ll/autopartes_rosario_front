import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { adjustmentSchema, type Adjustment } from '@/types/adjustments/adjustments.type';



export const getAdjustmentAction = async (adjustmentId: Adjustment['_id']) => {
  try {
    const url = `/adjustments/${adjustmentId}`;
    const { data } = await api.get(url);
    const result = adjustmentSchema.safeParse(data);
    if (result.success)
      return result.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}