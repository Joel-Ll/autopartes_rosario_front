import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type LoginForm = z.infer<typeof loginFormSchema>;