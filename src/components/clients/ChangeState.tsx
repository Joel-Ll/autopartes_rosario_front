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
import { changeStatetAction } from "@/actions/clients/change-state.action";
import { toast } from 'sonner';
import type { Client } from "@/types/clients/clients.type";

interface Props {
  openChange: boolean;
  setOpenChange: Dispatch<SetStateAction<boolean>>;
  clientId: Client['_id'];
  state: boolean
}

export const ChangeState = ({ openChange, setOpenChange, clientId, state }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: changeStatetAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
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
            {state ? '¿Inactivar cliente?' : '¿Activar cliente?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            { state ? 'El cliente quedará inhabilitado temporalmente.' : 'El cliente quedará habilitado'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant={ state ? 'destructive' : 'default'} onClick={() => mutate(clientId)}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
