import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils";
import type { MovementType } from "@/types/cash-register/cash-register.type";

const categoryLabel: Record<MovementType["category"], string> = {
  sale:              "Venta",
  sale_cancelation:  "Cancelación",
  manual_income:     "Ingreso manual",
  manual_expense:    "Egreso manual",
};

export const columns: ColumnDef<MovementType>[] = [
  // Tipo — ícono + badge
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const isIncome = row.original.type === "income";
      return (
        <div className="flex items-center gap-1.5">
          {isIncome ? (
            <ArrowUpCircle className="h-4 w-4 text-emerald-500 shrink-0" />
          ) : (
            <ArrowDownCircle className="h-4 w-4 text-red-500 shrink-0" />
          )}
          <Badge
            className={cn(
              "text-xs font-normal",
              isIncome
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            )}
          >
            {isIncome ? "Ingreso" : "Egreso"}
          </Badge>
        </div>
      );
    },
  },

  // Categoría
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {categoryLabel[row.original.category]}
      </span>
    ),
  },

  // Descripción
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <span className="text-sm font-medium truncate max-w-[200px] block">
        {row.original.description || "—"}
      </span>
    ),
  },

  // Métodos de pago (transactions)
  {
    id: "transactions",
    header: "Método",
    cell: ({ row }) => {
      const { transactions } = row.original;
      if (!transactions?.length) return <span className="text-muted-foreground text-sm">—</span>;
      return (
        <div className="flex flex-col gap-0.5">
          {transactions.map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs px-1.5 py-0 capitalize">
                {t.method === "cash" ? "Efectivo" : "QR"}
              </Badge>
              <span className="font-medium text-foreground">
                Bs. {t.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    },
  },

  // Monto total
  {
    id: "amount",
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const total = row.original.transactions?.reduce((acc, t) => acc + t.amount, 0) ?? 0;
      const isIncome = row.original.type === "income";
      return (
        <div className={cn(
          "text-right font-medium text-sm",
          isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
        )}>
          {isIncome ? "+" : "−"} Bs. {total.toLocaleString()}
        </div>
      );
    },
  },

  // Fecha
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground whitespace-nowrap">
        {formatDate(new Date(row.original.createdAt))}
      </div>
    ),
  },
];