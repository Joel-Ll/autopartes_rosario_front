import type { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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

import type { Product } from '@/types/products/products.type'
import { deleteProductAction } from '@/actions/products/delete-product.action';


interface Props {
  productId: Product['_id'],
  openDelete: boolean;
  setOpenDelete: Dispatch<SetStateAction<boolean>>
}

export default function DeleteProduct({ productId, openDelete, setOpenDelete }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProductAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data);
    }
  });

  return (
    <AlertDialog
      open={openDelete}
      onOpenChange={(isOpen) => {
        setOpenDelete(isOpen);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro de eliminar el producto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
            Esto eliminará permanentemente todo el registro de información del producto
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(productId)}
          >Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
