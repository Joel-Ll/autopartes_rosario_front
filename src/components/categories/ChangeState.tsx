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
import type { Category } from '@/types/categories/categories.types';
import { changeStatetAction } from '@/actions/categories/change-state.action';

interface Props {
  openChange: boolean;
  setOpenChange: Dispatch<SetStateAction<boolean>>;
  categoryId: Category['_id'];
  state: boolean
}

export const ChangeState = ({ openChange, setOpenChange, categoryId, state }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: changeStatetAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
            {state ? '¿Inactivar categoría?' : '¿Activar categoría?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            { state ? 'La categoría quedará inhabilitada temporalmente.' : 'La categoría quedará habilitada'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant={ state ? 'destructive' : 'default'} onClick={() => mutate(categoryId)}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
