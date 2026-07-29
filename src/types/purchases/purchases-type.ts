import { z } from 'zod';
import { productSchema  } from '../products/products.type';

export const productItemSchema = productSchema.pick({
  _id: true,
  internalCode: true,
  catalogCode: true,
  image: true,
  description: true,
  brand: true,
  purchasePrice: true,
  salePrice: true,
  isActive: true
});
export type ProductCatalog = z.infer<typeof productItemSchema>

export const productItemsSchema = z.array(productItemSchema);

const purchaseItemSchema = productItemSchema.extend({quantity: z.number()})

export type ProductItem = z.infer<typeof purchaseItemSchema>

export const purchaseFormSchema = z.object({
  supplier: z.string().min(1, "El proveedor es requerido"),
  invoiceNumber: z.string().min(1, 'El campo es obligatorio'),
  date: z.date({
    error: issue => issue.input === undefined ? "La fecha es requerida" : "Valor no válido"
  }),
  detail: z.string(),
  items: z
    .array(purchaseItemSchema)
    .min(1, "Debe agregar al menos un producto"),
});

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;


export const purchaseSchema = z.object({
  _id: z.string(),
  supplier: z.object({
    _id: z.string(),
    enterprise: z.string(),
  }),
  invoiceNumber: z.string(),
  date: z.string(),
  detail: z.string(),
  products: z.array(z.object({
    productId: z.string(),
    image: z.string(),
    internalCode: z.string(),
    catalogCode: z.string(),
    description: z.string(),
    brand: z.string(),
    quantity: z.number(),
    purchasePrice: z.number(),
    salePrice: z.number(),
    subtotal: z.number(),
  })),
  totalAmount: z.number(),
  status: z.string(),
  createdAt: z.string()
});

export const purchasesSchema = z.array(purchaseSchema);
export type Purchase = z.infer<typeof purchaseSchema>;

// Find All - STATS
export const purchaseData = purchaseSchema.pick({
  _id: true,
  date: true,
  invoiceNumber: true,
  supplier: true,
  totalAmount: true,
  status: true
}).extend({products: z.number()});

export type PurchaseData = z.infer<typeof purchaseData>

export const purchasesData = z.array(purchaseData) 
export type PurchasesData = z.infer<typeof purchasesData>

export const purchaseStats = z.object({
  totalPurchases: z.number(),
  totalPurchased: z.number(),
  totalCancelled: z.number(),
  totalAmount: z.number()
});

export type PurchaseStats = z.infer<typeof purchaseStats>

export const purchasesResponse = z.object({
  stats: purchaseStats,
  data: purchasesData
})