import { z } from 'zod';
import { supplierSchema } from '../suppliers/suppliers.type';
import { categorySchema } from '../categories/categories.types';

export const productSchema = z.object({
  _id: z.string(),
  code: z.string(),
  image: z.string(),
  description: z.string(),
  minStock: z.number(),
  currentStock: z.number(),
  unidadMedidaCodigo: z.number(),
  brand: z.string(),
  supplier: supplierSchema.pick({ enterprise: true, _id: true }),
  category: categorySchema.pick({ name: true, _id: true }),
  purchasePrice: z.number(),
  salePrice: z.number(),
  createdAt: z.string(),
  unidadMedidaAbr: z.string().optional(),
  isActive: z.boolean()
});

export const productsSchema = z.array(productSchema);
export type Product = z.infer<typeof productSchema>


/** Formularios */
export const productFormSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  image: z.string().optional(),
  category: z.string().min(1, "La categoría es requerida"),
  supplier: z.string().min(1, "El proveedor es requerido"),
  brand: z.string().min(1, "La marca es requerida"),
  unidadMedidaCodigo: z.string().min(1, 'La unidad de producto es requerida'),
  minStock: z.number('El campo es requido').gte(0, 'Número no válido'),
  purchasePrice: z.number('El campo es requido').gte(0, 'Número no válido'),
  salePrice: z.number('El campo es requido').gte(0, 'Número no válido'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;


/** Existencia de Productos */
export const addStockFormSchema = z.object({
  supplierId: z.string().min(1, "El proveedor es requerido"),
  lotNumber: z.string().optional(),
  quantity: z.string().min(1, "La cantidad es requerido"),
  purchasePrice: z.string().min(1, "El precio de compra es requerido"),
  sellingMargin: z.string().min(1, "El margen de ganancia es requerido"),
  salePrice: z.string().min(1, "El precio de venta es requerido"),
  notes: z.string().min(1, 'La nota es requerida')
})
export type AddStockFormValues = z.infer<typeof addStockFormSchema>