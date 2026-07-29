import { z } from 'zod';


export const typeClient = [
  { id: 1, label: 'PERSONA', value: 'person' },
  { id: 2, label: 'EMPRESA', value: 'company' },
] as const;

export const typeDocument = [
  { id: 1, label: 'NIT', value: 'nit' },
  { id: 2, label: 'CI', value: 'ci' },
] as const;


export const clientSchema = z.object({
  _id: z.string(),
  razonSocial: z.string(),
  tipoDocumento: z.enum(['ci', 'nit']),
  documentoId: z.string(),
  phone: z.string(),
  email: z.string(),
  typeClient: z.enum(['person', 'company']),
  state: z.boolean(),
  createdAt: z.string(),
  totalPurchases: z.number().optional(),
  totalAmount: z.number().optional()
});

const statsSchema = z.object({
  totalClients: z.number(),
  activeClients: z.number(),
  clientCompanies: z.number(),
  clientPersons: z.number(),
});

export const clientsResponseSchema = z.object({
  clients: z.array(clientSchema),
  stats: statsSchema,
});

export type Client = z.infer<typeof clientSchema>
export type ClientsStats = z.infer<typeof statsSchema>
export type ClientsResponse = z.infer<typeof clientsResponseSchema>


// Fomularios
export const clientFormSchema = z.object({
  razonSocial: z.string().trim().min(1, 'El nombre del cliente es obligatorio'),
  typeClient: z.string().trim().min(1, 'Tipo de cliente debe ser persona o empresa'),
  tipoDocumento: z.string().trim().min(1, 'Tipo de documento debe ser nit o ci'),
  documentoId: z.string().trim().min(1, 'El número de documento es obligatorio'),
  phone: z.string().optional(),
  email: z.email({error: 'Email no válido'}).or(z.literal('')).optional()
});
export type ClientFormValues = z.infer<typeof clientFormSchema>;