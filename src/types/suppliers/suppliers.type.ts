import { z } from 'zod';

export const supplierSchema = z.object({
  _id: z.string(),
  enterprise: z.string(),
  contact: z.object({
    name: z.string(),
    phone: z.string()
  }),
  location: z.object({
    city: z.string(),
    address: z.string()
  }),
  productsRef: z.array(z.string()),
  description: z.string(),
  isActive: z.boolean(),
  totalPurchases: z.number().optional(),
  totalAmount: z.number().optional(),
  lastPurchase: z.string().nullable(),
  createdAt: z.string(),
});

export const supplierSelectSchema = supplierSchema.pick({
  _id: true,
  enterprise: true,
  isActive: true
});
// export const suppliersSchema = z.array(supplierSchema);
export const suppliersSelectSchema = z.array(supplierSelectSchema);

export type Supplier = z.infer<typeof supplierSchema>
export type SupplierSelect = z.infer<typeof supplierSelectSchema>

export const supplierStats = z.object({
  totalSuppliers: z.number(),
  activeSuppliers: z.number(),
  topSupplier: z.object({
    purchases: z.number(),
    enterprise: z.string()
  }).optional(),
  totalAmount: z.number()
})
export type SupplierStats = z.infer<typeof supplierStats>

export const supplierDataStats = z.object({
  _id: z.string(),
  enterprise: z.string(),
  contact: z.object({
    name: z.string(),
    phone: z.string()
  }),
  totalPurchased: z.number(),
  lastPurchase: z.string().nullable(),
  totalPurchases: z.number(),
  isActive: z.boolean(),
})
export type SupplierDataStats = z.infer<typeof supplierDataStats>

export const suppliersDataStats = z.array(supplierDataStats)

export const charts = z.array(z.object({
  totalAmount: z.number(),
  enterprise: z.string()
}))
export type ChartsSuppliers = z.infer<typeof charts>

export const responseSuppliersSchema = z.object({
  stats: supplierStats,
  data:suppliersDataStats,
  charts
});

export type ResponseSuppliers = z.infer<typeof responseSuppliersSchema>



/** Formularios */
export const supplierFormSchema = z.object({
  enterprise: z.string()
    .trim()
    .min(2, 'El nombre de la empresa necesita al menos 2 caracteres'),
  contact: z.object({
    name: z.string()
      .trim()
      .min(2, 'El nombre del promotor necesita al menos 2 caracteres'),
    phone: z.string()
      .trim()
      .min(7, 'El teléfono debe tener al menos 7 dígitos'),
  }),
  location: z.object({
    city: z.string().min(1, 'La ciudad es requerida'),
    address: z.string().min(1, 'La dirección es requerida')
  }),
  productsRef: z.array(z.string()).min(1, "Seleccione al menos un producto de referencia"),
  description: z.string().optional()
});
export type SupplierFormValues = z.infer<typeof supplierFormSchema>;