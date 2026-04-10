import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { categoryFormSchema, type Category, type CategoryFormValues } from '@/types/categories/categories.types';
import { updateCategoryAction } from '@/actions/categories/update-category.action';
import { getCategoryAction } from '@/actions/categories/get-category.action';
import { useProductsServicesSiat } from '@/hooks/useSiat';
import { ProductServiceSelector } from '../ui/product-service-selector';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: Category['_id']
}

export default function EditCategory({ open, setOpen, categoryId }: Props) {
  const { data: dataProductsService } = useProductsServicesSiat();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      codigoSin: '',
      isActive: false
    }
  });

  const { data, refetch } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryAction(categoryId),
    enabled: false,
    retry: false
  });

  useEffect(() => {
    if (open && categoryId) {
      refetch();
    }
  }, [open, categoryId, refetch]);

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        codigoSin: `${data.codigoProductoSin}|${data.codigoActividadSin}`,
        isActive: data.isActive
      })
    }
  }, [data])

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateCategoryAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['category', categoryId] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories-active'] });
      toast.success(data);
      handleClose();
    }
  });

  const onSubmit = (formData: CategoryFormValues) => {
    mutate({ categoryId, formData });
  }

  const handleClose = () => {
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => handleClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Registro</DialogTitle>
          <DialogDescription>
            Llena los campos del formulario para editarategoria
          </DialogDescription>
        </DialogHeader>

        <div className="grid flex-1 auto-rows-min gap-6 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Electrónicos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codigoSin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto / Servicio SIN</FormLabel>

                    <ProductServiceSelector
                      items={dataProductsService?.registers ?? []}
                      value={field.value}
                      onChange={field.onChange}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cambiar estado</FormLabel>
                    <Select
                      value={field.value ? "active" : "inactive"}
                      onValueChange={(value) => {
                        field.onChange(value === "active");
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button type="submit">Aceptar</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
