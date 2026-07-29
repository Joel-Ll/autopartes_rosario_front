import { isAxiosError } from "axios";
import api from "@/lib/axios";

export const updateUsernameAction = async (username: string = '') => {
  try {
    const url = '/users/admin/username';
    const { data } = await api.patch<string>(url, { username });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}