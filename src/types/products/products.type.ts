import { z } from 'zod';
import { supplierSchema } from '../suppliers/suppliers.type';
import { categorySchema } from '../categories/categories.types';

export const unitType = [
  { label: "UNIDAD", value: 'und', id: 1 },
  { label: "PIEZA", value: 'pza', id: 2 },
  { label: "JUEGO", value: 'jgo', id: 3 },
  { label: "LITRO", value: "lt", id: 4 },
  { label: "METRO", value: "m", id: 9 },
  { label: "KIT", value: "kit", id: 13 },
];

export const productSchema = z.object({
  _id: z.string(),
  internalCode: z.string(),
  catalogCode: z.string(),
  location: z.string(),
  image: z.string(),
  description: z.string(),
  unidadMedida: z.string(),
  brand: z.string(),
  supplier: supplierSchema.pick({ enterprise: true, _id: true }),
  category: categorySchema.pick({ name: true, _id: true }),
  currentStock: z.number(),
  minStock: z.number(),
  purchasePrice: z.number(),
  salePrice: z.number(),
  discountReference: z.number(),
  isActive: z.boolean().optional(),
  createdAt: z.string()
});

const statsSchema = z.object({
  totalProducts: z.number(),
  activeProducts: z.number(),
  lowStockCount: z.number(),
  outOfStockCount: z.number(),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  stats: statsSchema,
});

export type Product = z.infer<typeof productSchema>
export type ProductsStats = z.infer<typeof statsSchema>
export type ProductsResponse = z.infer<typeof productsResponseSchema>

export const productsSchema = z.array(productSchema);

export const filteredProducts = z.array(productSchema.pick({
  _id: true,
  internalCode: true,
  catalogCode: true,
  image: true,
  description: true,
  brand: true,
  currentStock: true,
  salePrice: true,
}).extend({
  isActive: z.boolean(),
  category: z.string()
}))

export type CatalogProduct = {
  _id: string,
  internalCode: string,
  catalogCode: string,
  image: string,
  description: string,
  brand: string,
  currentStock: number,
  salePrice: number,
  isActive: boolean,
  category: string, // valor agregado
}


/** Formularios */
export const productFormSchema = z.object({
  catalogCode: z.string(),
  location: z.string(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  image: z.string().optional(),
  category: z.string().min(1, "La categoría es obligatorio"),
  supplier: z.string().min(1, "El proveedor es obligatorio"),
  brand: z.string().min(1, "La marca es obligatorio"),
  unidadMedida: z.string().min(1, 'La unidad de medida es obligatorio'),
  minStock: z.number('El campo es requerido').gte(0, 'Número no válido'),
  purchasePrice: z.number('El campo es requerido').gte(0, 'Número no válido'),
  salePrice: z.number('El campo es requerido').gte(0, 'Número no válido'),
  discountReference: z.number('El campo es requerido').gte(0, 'Número no válido'),
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