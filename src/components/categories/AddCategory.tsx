import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categoryFormSchema, type CategoryFormValues } from '@/types/categories/categories.types';
import { createCategoryAction } from '@/actions/categories/create-category.action';
import { useProductsServicesSiat } from '@/hooks/useSiat';
import { ProductServiceSelector } from '../ui/product-service-selector';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AddCategory() {
  const [open, setOpen] = useState(false);
  const { data: dataProductsService } = useProductsServicesSiat();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      codigoSin: ''
    }
  });


  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createCategoryAction,
    onError: (err: TypeError) => {
      toast.error(err.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['categories-active'] })
      toast.success(data);
    }
  });

  const onSubmit = (formData: CategoryFormValues) => {
    mutate(formData)
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size={'lg'} className='gap-2' onClick={() => setOpen(true)}>
          <Plus className="h-5 w-5" />
          Nueva Categoría
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Categoría</DialogTitle>
          <DialogDescription>
            Ingrese el nombre de la nueva categoria
          </DialogDescription>
        </DialogHeader>

        <div className="grid flex-1 auto-rows-min gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ej. Electrónicos'
                        className='text-sm'
                        {...field}
                      />
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
