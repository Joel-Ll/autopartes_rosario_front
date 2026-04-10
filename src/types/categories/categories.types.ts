import { z } from 'zod';

export const categoryBaseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  codigoActividadSin: z.string(),
  codigoProductoSin: z.string(),
  isActive: z.boolean(),
});

export const categorySchema = categoryBaseSchema.extend({
  products: z.array(z.string()),
  createdAt: z.string()
});

export const categoryActiveSchema = categoryBaseSchema.pick({
  _id: true,
  name: true
})
export const categoriesActiveSchema = z.array(categoryActiveSchema);
export type CategoryActive = z.infer<typeof categoryActiveSchema>;

export const categoriesSchema = z.array(categorySchema);
export type Category = z.infer<typeof categorySchema>;

/** Formularios */
export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, 'El nombre de categoría es obligatorio'),
  codigoSin: z.string().trim().min(1, 'El código SIN obligatorio'),
  isActive: z.boolean().optional()
});
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;