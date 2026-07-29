import { z } from 'zod';

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  totalProducts: z.number(),
  stockTotal: z.number(),
  inventoryValue: z.number(),
});


export const categoriesResponseSchema = z.object({
  stats: z.object({
    totalCategories: z.number(),
    totalCategoriesActive: z.number(),
    totalCategoriesEmpty: z.number(),
    totalInventoryValue: z.number()
  }),
  charts: z.object({
    topCategories: z.array(categorySchema.pick({
      name: true,
      totalProducts: true,
    }))
  }),
  data: z.array(categorySchema)
});

export const categorySelectSchema = categorySchema.pick({
  _id: true,
  name: true,
  isActive: true
})
export const categoriesSelectSchema = z.array(categorySelectSchema);
export type CategorySelect = z.infer<typeof categorySelectSchema>;

export type Category = z.infer<typeof categorySchema>;

export type CategoriesStats = {
  totalCategories: number;
  totalCategoriesActive: number;
  totalCategoriesEmpty: number;
  totalInventoryValue: number
};

export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;

/** Formularios */
export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, 'El nombre de categoría es obligatorio'),
  description: z.string().optional(),
});
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

// Find One Category
export const categoryDetailSchema = categorySchema.pick({
  _id: true,
  name: true,
  description: true,
  isActive: true
});

export const categoryStatsSchema = z.object({
  totalProducts: z.number(),
  stockTotal: z.number(),
  inventoryValue: z.number().min(0),
  lowStockCount: z.number(),
  outOfStockCount: z.number(),
});

export const categoryProductSchema = z.object({
  _id: z.string(),
  image: z.string(),
  internalCode: z.string(),
  catalogCode: z.string(),
  description: z.string(),
  brand: z.string(),
  currentStock: z.number(),
  minStock: z.number(),
  purchasePrice: z.number(),
  salePrice: z.number(),
  stockStatus: z.enum(['ok', 'low', 'out']),
  profit: z.number(),
  margin: z.number(),
  isActive: z.boolean()
});

export const categoryWithProductsSchema = z.object({
  category: categoryDetailSchema,
  stats: categoryStatsSchema,
  products: z.array(categoryProductSchema),
});

export type CategoryDetail = z.infer<typeof categoryDetailSchema>;
export type CategoryStats = z.infer<typeof categoryStatsSchema>;
export type CategoryProduct = z.infer<typeof categoryProductSchema>;
export type CategoryWithProducts = z.infer<typeof categoryWithProductsSchema>;
export type ChartCategory = {
  name: string,
  totalProducts: number
}[]
