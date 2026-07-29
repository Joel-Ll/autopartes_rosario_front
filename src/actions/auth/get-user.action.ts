import api from "@/lib/axios";
import { userAuthSchema } from "@/types/auth/auth.types";
import { isAxiosError } from "axios";

export const getUserAuthAction = async () => {
  try {
    const { data } = await api.get('/auth/user');
    const response = userAuthSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

