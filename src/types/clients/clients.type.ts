import { z } from 'zod';
export const clientSchema = z.object({
  _id: z.string(),
  documentoId: z.string(),
  complementoId: z.string(),
  tipoDocumento: z.number(),
  razonSocial: z.string(),
  email: z.string(),
  state: z.boolean(),
});

export const clientsSchema = z.array(clientSchema);
export type Client = z.infer<typeof clientSchema>