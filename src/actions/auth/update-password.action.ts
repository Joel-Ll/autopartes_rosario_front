import api from "@/lib/axios";
import type { PasswordUpdateForm } from "@/types/auth/auth.types";
import { isAxiosError } from "axios";

export const udpatePasswordAction = async (formData: PasswordUpdateForm) => {
  try {
    const url = '/users/admin/password';
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}