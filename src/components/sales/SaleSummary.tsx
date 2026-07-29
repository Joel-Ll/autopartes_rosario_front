import { formatCurrency } from "@/utils";
import { CardFooter } from "@/components/ui/card";
import type { SalesFormValues } from "@/types/sales/sales.type";

interface Props {
  amountProducts: number;
  amountServices: number;
  items: SalesFormValues['items'];
  services: SalesFormValues['services'];
  globalDiscount: number;
  totalAmount: number;
  children: React.ReactNode;
}

export default function SaleSummary({
  amountProducts,
  amountServices,
  items,
  services,
  globalDiscount,
  totalAmount,
  children
}: Props) {
  return (
    <CardFooter className="grid space-y-3">
      {/* SUBTOTAL PRODUCTOS */}
      {items.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal Productos
          </span>

          <span>
            Bs. {formatCurrency(amountProducts)}
          </span>
        </div>
      )}

      {/* TOTAL SERVICIOS */}
      {services.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Total Servicios
          </span>

          <span>
            Bs. {formatCurrency(amountServices)}
          </span>
        </div>

      )}

      {/* DESCUENTO */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Descuento aplicado
        </span>

        <span className="text-red-500">
          - Bs. {globalDiscount.toFixed(2)}
        </span>
      </div>

      {/* TOTAL */}
      <div className="flex items-center justify-between pt-4 border-t">
        <span className="font-bold text-lg">
          TOTAL
        </span>

        <span className="font-bold text-3xl text-primary">
          Bs. {formatCurrency(totalAmount)}
        </span>
      </div>
      {children}
    </CardFooter>
  )
}
