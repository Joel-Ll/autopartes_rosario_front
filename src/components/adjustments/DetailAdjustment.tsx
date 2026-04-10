import { getAdjustmentAction } from '@/actions/adjustments/get-adjustment.action';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Adjustment } from '@/types/adjustments/adjustments.type';
import { useQuery } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';
import { Badge } from '../ui/badge';

interface Props {
  openView: boolean;
  setOpenView: Dispatch<SetStateAction<boolean>>;
  adjustmentId: Adjustment['_id'];
  setAdjustmentId: Dispatch<SetStateAction<string>>
}


export const DetailAdjustment = ({
  openView,
  setOpenView,
  adjustmentId,
  setAdjustmentId
}: Props) => {

  const { data: selectedAdjustment} = useQuery({
    queryKey: ['adjustment', adjustmentId],
    queryFn: () => getAdjustmentAction(adjustmentId),
    retry: false,
    enabled: !!adjustmentId
  });

  return (
    <Dialog
      open={openView}
      onOpenChange={(isOpen) => {
        setOpenView(isOpen);
        if (!isOpen) {
          setAdjustmentId('');
        }
      }}
    >
      {selectedAdjustment && (
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalle del Ajuste</DialogTitle>
            <DialogDescription>Información completa del ajuste de stock</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Fecha</span>
              <span className="text-sm font-medium">{selectedAdjustment.createdAt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Producto</span>
              <span className="text-sm font-medium">{selectedAdjustment.product.description}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Código</span>
              <span className="text-sm font-medium">{selectedAdjustment.product.code}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tipo</span>
              <Badge
                variant="outline"
                className={
                  selectedAdjustment.adjustmentType === "increment"
                    ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                    : "border-red-500 text-red-600 bg-red-50"
                }
              >
                {selectedAdjustment.adjustmentType === "increment" ? "Incremento" : "Reducción"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cantidad</span>
              <span className={`text-lg font-bold ${selectedAdjustment.adjustmentType === "increment" ? "text-emerald-600" : "text-red-600"}`}>
                {selectedAdjustment.adjustmentType === "increment" ? "+" : "-"}{selectedAdjustment.quantity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Stock</span>
              <span className="text-sm">
                {selectedAdjustment.previousStock} → <span className="font-bold">{selectedAdjustment.newStock}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Motivo</span>
              <span className="text-sm font-medium">{selectedAdjustment.reason}</span>
            </div>
            {selectedAdjustment.note && (
              <div className="pt-2 border-t">
                <span className="text-sm text-muted-foreground">Nota</span>
                <p className="text-sm mt-1">{selectedAdjustment.note}</p>
              </div>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
