import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import type { Cash, RegisterInternalMovementValues } from '@/types/cash-register/cash-register.type';


interface Params {
  cashRegisterId: Cash['_id']
  formData: RegisterInternalMovementValues
}

export const registerInternalMovementAction = async ({cashRegisterId, formData}: Params) => {
  try {
    const url = `/cash-register/${cashRegisterId}/internal-movement`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message)
  }
}