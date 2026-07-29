import z from "zod";

export const statsDashSchema = z.object({
  todaySales: z.number(),
  todayProfit: z.number(),
  salesCount: z.number(),
  productsSold: z.number(),
  totalProducts: z.number(),
  lowStockProducts: z.number(),
  todayPurchases: z.number(),
  cashStatus: z.object({
    code: z.string(),
    status: z.string(),
    user: z.string(),
  }).nullable()
})

export const statsdashResponse = z.object({
  stats: statsDashSchema
});
export type StatsDash = z.infer<typeof statsDashSchema>;