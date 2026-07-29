import { z } from 'zod';

export const userAuthSchema = z.object({
  username: z.string(),
  role:z.string(),
});

export type UserAuth = z.infer<typeof userAuthSchema>

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type LoginForm = z.infer<typeof loginFormSchema>;

export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, {error: 'El password actual es obligatorio'}).trim(),
  newPassword: z.string().min(5, {error: 'Password muy corto, min 5 caracteres'}).trim(),
  confirmPassword: z.string().min(5, {error: 'Password muy corto, min 5 caracteres'}).trim(),
})

export type PasswordUpdateForm = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}