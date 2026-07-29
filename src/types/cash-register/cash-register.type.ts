import { z } from 'zod';

export const cashSchema = z.object({
  _id: z.string(),
  code: z.string(),
  user: z.string(),
  openedAt: z.string(),
  closedAt: z.string().nullable(),
  initialAmount: z.number(),
  totalSales: z.number(),
  totalDiscounts: z.number(),
  cashIncome: z.number(),
  qrIncome: z.number(),
  manualIncome: z.number(),
  manualExpense: z.number(),
  totalMovements: z.number(),
  expectedAmount: z.number(),
  countedAmount: z.number(),
  difference: z.number(),
  closingNote: z.string(),
  status: z.enum(['open', 'completed', 'with_difference']),
});

export const statCashSchema = z.object({
  totalIncome: z.number(),
  cashIncome: z.number(),
  qrIncome: z.number(),
  totalMovements: z.number()
});

export type StatCash = z.infer<typeof statCashSchema>

export const movementSchema = z.object({
  _id: z.string(),
  type: z.enum(['income', 'expense']),
  category: z.enum(['sale', 'sale_cancelation', 'manual_income', 'manual_expense']),
  transactions: z.array(z.object({
    method: z.enum(['qr', 'cash']),
    amount: z.number()
  })),
  description: z.string(),
  createdAt: z.string(),
})
export type MovementType = z.infer<typeof movementSchema>

export const movementsSchema = z.array(movementSchema);
export const cashRegisterResponseSchema = z.object({
  cashRegister: cashSchema,
  stats: statCashSchema,
  movements: movementsSchema
})

export const cashOpenSchema = z.object({
  _id: z.string(),
  code: z.string(),
  user: z.string()
});

const statsSchema = z.object({
  totalRegisters: z.number(),
  totalIncome: z.number(),
  totalExpense: z.number(),
  totalDiscounts: z.number(),
});

const currentCashSchema = z.object({
  _id: z.string(),
  code: z.string(),
  user: z.string(),
  openedAt: z.string(),
  expectedAmount: z.number(),
  initialAmount: z.number(),
  status: z.enum(['open', 'completed', 'with_difference']),
}).nullable();
export type CurrectCash = z.infer<typeof currentCashSchema>

const cashRegisterDataSchema = cashSchema.pick({
  _id: true,
  code: true,
  user: true,
  expectedAmount: true,
  countedAmount: true,
  openedAt: true,
  totalMovements: true,
  status: true
});
export type CashRegisterData = z.infer<typeof cashRegisterDataSchema>

export const cashRegistersResponseSchema = z.object({
  stats: statsSchema,
  currentCash: currentCashSchema,
  data: z.array(cashRegisterDataSchema)
})

export const cashResponseSchema = z.object({
  stats: statsSchema,
  data: z.array(cashSchema),
});

export type CashOpen = z.infer<typeof cashOpenSchema>
export type Cash = z.infer<typeof cashSchema>
export type CashStats = z.infer<typeof statsSchema>
export type CashResponse = z.infer<typeof cashResponseSchema>

/** Formularios */
export const cashRegisterFormSchema = z.object({
  user: z.string().trim().min(1, 'El responsable de caja es obligatorio'),
  transactions: z.array(z.object({
    method: z.enum(['cash', 'qr']),
    amount: z.number().nullable().refine(
      (val) => val !== null,
      { message: 'El monto inicial es requerido' }
    ),
  })),
});
export type CashRegisterFormValues = z.infer<typeof cashRegisterFormSchema>;

export const closedCashRegisterFormSchema = z.object({
  countedAmount: z.number().nullable().refine(
    (val) => val !== null,
    { message: 'El monto final es requerido' }
  ),
  closingNote: z.string().optional(),
});
export type ClosedCashRegisterFormValues = z.infer<typeof closedCashRegisterFormSchema>;

export const registerInternalMovementFormSchema = z.object({
  type: z.enum(['income', 'expense']),
  description: z.string().trim().min(1, 'La descripción del movimiento es obligatorio'),
  amount: z.number().nullable().refine(
    (val) => val !== null,
    { message: 'El monto es requerido' }
  )
})

export type RegisterInternalMovementValues = z.infer<typeof registerInternalMovementFormSchema>


// Fomularios
// export const clientFormSchema = z.object({
//   razonSocial: z.string().trim().min(1, 'El nombre del cliente es obligatorio'),
//   typeClient: z.string().trim().min(1, 'Tipo de cliente debe ser persona o empresa'),
//   tipoDocumento: z.string().trim().min(1, 'Tipo de documento debe ser nit o ci'),
//   documentoId: z.string().trim().min(1, 'El número de documento es obligatorio'),
//   phone: z.string().optional(),
//   email: z.email({ error: 'Email no válido' }).or(z.literal('')).optional()
// });
// export type ClientFormValues = z.infer<typeof clientFormSchema>;