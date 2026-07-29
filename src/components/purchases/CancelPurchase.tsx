import type { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TriangleAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cancelPurchaseAction } from '@/actions/purchases/cancel-purchase.action';
import { toast } from 'sonner';
import type { Purchase } from '@/types/purchases/purchases-type';

interface Props {
  openCancel: boolean;
  setOpenCancel: Dispatch<SetStateAction<boolean>>;
  purchaseId: Purchase['_id']
}

export const CancelPurchase = ({ openCancel, setOpenCancel, purchaseId }: Props) => {

  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: cancelPurchaseAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['purchases']});
      toast.success(data);
    }
  });

  return (
    <AlertDialog
      open={openCancel}
      onOpenChange={(isOpen) => {
        setOpenCancel(isOpen);
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <TriangleAlert />
          </AlertDialogMedia>
          <AlertDialogTitle>¿Seguro que deseas anular esta compra?</AlertDialogTitle>
          <AlertDialogDescription>
            Esto revertirá el stock de todos los productos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => mutate(purchaseId)}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
