import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { supplierFormSchema, type Supplier, type SupplierFormValues } from '@/types/suppliers/suppliers.type';
import { getSupplierAction } from '@/actions/suppliers/get-supplier.action';
import { updateSuplierAction } from '@/actions/suppliers/update-supplier.action';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  supplierId: Supplier['_id']
}

export default function EditSupplier({ open, setOpen, supplierId }: Props) {

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      enterprise: '',
      name: '',
      phone: '',
      address: '',
      isActive: true
    }
  });

  const { data, refetch } = useQuery({
    queryKey: ['supplier', supplierId],
    queryFn: () => getSupplierAction(supplierId),
    enabled: false,
    retry: false
  });

  useEffect(() => {
    if (open && supplierId) {
      refetch();
    }
  }, [open, supplierId, refetch])

  useEffect(() => {
    if (data) {
      form.reset({
        enterprise: data.enterprise,
        name: data.name,
        phone: data.phone,
        address: data.address,
        isActive: data.isActive
      })
    }
  }, [data]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateSuplierAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['supplier', supplierId] })
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      queryClient.invalidateQueries({ queryKey: ['suppliers-active'] });
      toast.success(data);
      handleClose();
    }
  })

  const handleClose = () => {
    setOpen(false);
  }

  const onSubmit = (formData: SupplierFormValues) => {
    mutate({ supplierId, formData });
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
            Ingrese los nuevos datos del registro
          </DialogDescription>
        </DialogHeader>

        <div className="grid flex-1 auto-rows-min gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
              <FormField
                control={form.control}
                name="enterprise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
