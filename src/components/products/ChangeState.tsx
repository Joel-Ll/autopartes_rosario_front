import type { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import type { Product } from '@/types/products/products.type';
import { changeStatetAction } from '@/actions/products/update-state-product.action';

interface Props {
  openChange: boolean;
  setOpenChange: Dispatch<SetStateAction<boolean>>;
  productId: Product['_id'];
  state?: boolean
}

export const ChangeState = ({ openChange, setOpenChange, productId, state }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: changeStatetAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
  
  return (
    <AlertDialog
      open={openChange}
      onOpenChange={(isOpen) => {
        setOpenChange(isOpen);
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>

          <AlertDialogTitle>
            {state ? '¿Inactivar producto?' : '¿Activar producto?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            { state ? 'El producto quedará inhabilitado temporalmente.' : 'El producto quedará habilitado'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant={ state ? 'destructive' : 'default'} onClick={() => mutate(productId)}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
