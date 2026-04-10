import { z } from 'zod';

export const supplierSchema = z.object({
  _id: z.string(),
  enterprise: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  isActive: z.boolean().optional()
});
export const supplierActiveSchema = supplierSchema.pick({
  _id: true,
  enterprise: true
});
export const suppliersSchema = z.array(supplierSchema);
export const suppliersActiveSchema = z.array(supplierActiveSchema);

export type Supplier = z.infer<typeof supplierSchema>
export type SupplierActive = z.infer<typeof supplierActiveSchema>



/** Formularios */
export const supplierFormSchema = z.object({
  enterprise: z.string()
    .trim()
    .min(2, 'El nombre de la empresa necesita al menos 2 caracteres'),
  name: z.string()
    .trim()
    .min(2, 'El nombre del promotor necesita al menos 2 caracteres'),
  phone: z.string()
    .trim()
    .min(7, 'El teléfono debe tener al menos 7 dígitos'),
  address: z.string()
    .trim()
    .min(2, 'La dirección necesita al menos 2 caracteres'),
  isActive: z.boolean().optional()
});
export type SupplierFormValues = z.infer<typeof supplierFormSchema>;