import { z } from 'zod';

export const purchaseFormSchema = z.object({
  supplier: z.string(),
  invoiceNumber: z.string(),
  date: z.date(),
  detail: z.string(),
  items: z.array(z.object({
    _id: z.string(),
    code: z.string(),
    description: z.string(),
    brand: z.string(),
    purchasePrice: z.number(),
    salePrice: z.number(),
    quantity: z.number()
  }))
})