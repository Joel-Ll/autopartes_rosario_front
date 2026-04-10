import type { Dispatch, SetStateAction } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import type { Purchase } from '@/types/purchases/purchases-type';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface Props {
  purchase: Purchase;
  openView: boolean;
  setOpenView: Dispatch<SetStateAction<boolean>>
}

export const DetailPurchase = ({ purchase, openView, setOpenView }: Props) => {

  return (
    <Dialog
      open={openView}
      onOpenChange={(isOpen) => {
        setOpenView(isOpen);
      }}
    >
      <DialogContent className="
      w-[95vw] 
      max-w-3xl 
      2xl:max-w-2xl 
      max-h-[70vh] 
      overflow-y-auto
      p-4 
      sm:p-6
    ">
        <DialogHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 sm:pt-5">
            <DialogTitle className="text-lg sm:text-xl">Detalle de Compra</DialogTitle>
            <Badge variant={'outline'} className={
              purchase.status === "active"
                ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                : "border-red-500 text-red-600 bg-red-50"
            }>
              {purchase.status === 'active' ? "Registrado" : "Anulado"}
            </Badge>
          </div>
          <DialogDescription className="sr-only">
            Información detallada de la compra
          </DialogDescription>
        </DialogHeader>

        {/* Header info */}
        <div className="space-y-4">
          {/* Grid responsiva: 1 columna en móvil, 2 en desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Proveedor</p>
              <p className="font-semibold text-sm sm:text-base">{purchase.supplier.enterprise}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Nro. Factura / Lote</p>
              <p className="font-mono font-semibold text-sm sm:text-base break-all">{purchase.invoiceNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Fecha</p>
              <p className="font-medium text-sm sm:text-base">{new Date(purchase.date).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Productos</p>
              <p className="font-medium text-sm sm:text-base">
                {purchase.products.length} productos · {purchase.products.reduce((acc, product) => acc + product.quantity, 0)} unidades
              </p>
            </div>
          </div>

          {purchase.detail && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Nota / Observación</p>
              <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3 wrap-break-word">
                {purchase.detail}
              </p>
            </div>
          )}

          {/* Summary card */}
          <div className="rounded-lg border bg-card p-3 sm:p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Compra</p>
            <p className="text-xl sm:text-2xl font-bold text-primary tabular-nums">
              Bs. {purchase.totalAmount.toLocaleString("en", { minimumFractionDigits: 2 })}
            </p>
          </div>

          <Separator />

          {/* Products detail */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
              Productos ({purchase.products.length})
            </h3>
            <div className="space-y-3">
              {purchase.products.map((item, idx) => {
                const subtotal = item.quantity * item.purchasePrice;

                return (
                  <div key={idx} className="rounded-lg border p-3 sm:p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm leading-tight wrap-break-word">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs font-mono text-muted-foreground">
                            {item.code}
                          </span>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {item.brand}
                          </Badge>
                        </div>
                      </div>
                      <p className="font-bold tabular-nums whitespace-nowrap text-sm sm:text-base">
                        Bs. {subtotal.toLocaleString("en", { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    {/* Grid responsiva:  2 columnas en móvil, 3 en desktop */}
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex justify-between items-center bg-muted/50 rounded px-2 py-1.5">
                        <p className="text-muted-foreground">Cantidad:</p>
                        <p className="font-semibold">{item.quantity}</p>
                      </div>
                      <div className="flex justify-between items-center bg-muted/50 rounded px-2 py-1.5">
                        <p className="text-muted-foreground">Precio Compra:</p>
                        <p className="font-semibold">Bs. {item.purchasePrice.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center bg-muted/50 rounded px-2 py-1.5">
                        <p className="text-muted-foreground">Precio Venta:</p>
                        <p className="font-semibold">Bs. {item.salePrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
