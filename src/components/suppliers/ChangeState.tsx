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
import type { Supplier } from '@/types/suppliers/suppliers.type';
import { changeStatetAction } from '@/actions/suppliers/change-state.action';

interface Props {
  openChange: boolean;
  setOpenChange: Dispatch<SetStateAction<boolean>>;
  supplierId: Supplier['_id'];
  state: boolean
}

export const ChangeState = ({ openChange, setOpenChange, supplierId, state }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: changeStatetAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  })
  

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
            {state ? '¿Inactivar proveedor?' : '¿Activar proveedor?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            { state ? 'El proveedor quedará inhabilitado temporalmente.' : 'El proveedor quedará habilitado'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant={ state ? 'destructive' : 'default'} onClick={() => mutate(supplierId)}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
