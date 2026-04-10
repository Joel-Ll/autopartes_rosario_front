import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { SelectProducts } from './SelectProducts';
import { Button } from '../ui/button';
import { ArrowUpDown, Minus, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '../ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsAction } from '@/actions/products/get-products.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { adjustmentsFormSchema, type AdjustmentsFormValues } from '@/types/adjustments/adjustments.type';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Controller, useForm } from 'react-hook-form';
import type z from 'zod';
import { createAdjustementAction } from '@/actions/adjustments/create-adjustment.action';
import { toast } from 'sonner';



const reasons = [
  { label: "Producto dañado", id: 1 },
  { label: "Producto vencido", id: 2 },
  { label: "Pérdida / Extravío", id: 3 },
  { label: "Corrección de inventario", id: 4 },
  { label: "Devolución a proveedor", id: 5 },
  { label: "Devolución de cliente", id: 6 },
  { label: "Donación", id: 7 },
  { label: "Inventario inicial", id: 8 },
  { label: "Otro", id: 9 },
];

export const AdjustmentsForm = () => {

  const form = useForm<AdjustmentsFormValues>({
    resolver: zodResolver(adjustmentsFormSchema),
    defaultValues: {
      product: '',
      adjustmentType: 'decrement',
      quantity: undefined,
      reason: '',
      note: ''
    },
  });

  // Traer productos;
  const { data = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProductsAction,
    retry: false
  });


  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createAdjustementAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['adjustments'] })
      toast.success(data);
      form.reset();
    }
  })

  const [currentStock, setCurrentStock] = useState<number>();
  const watchedQuantity = form.watch('quantity');


  const productOptions = data.map((p) => ({
    value: p._id,
    label: `${p.code} - ${p.description}`,
    stock: p.currentStock
  }));

  function onSubmit(data: z.infer<typeof adjustmentsFormSchema>) {
    mutate(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Nuevo Ajuste de Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-rhf-demo" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Producto */}
            <Controller
              name="product"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Producto *</FieldLabel>
                  <SelectProducts
                    value={field.value}
                    onValueChange={field.onChange}
                    options={productOptions}
                    placeholder="Seleccionar producto..."
                    searchPlaceholder="Buscar por código o descripción..."
                    emptyMessage="No se encontró el producto"
                    currentStock={currentStock}
                    setCurrentStock={setCurrentStock}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Tipo de ajuste */}
            <Controller
              name="adjustmentType"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Tipo de Ajuste</FieldLabel>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={field.value === "decrement" ? "default" : "outline"}
                      className={`flex-1 gap-2 ${field.value === "decrement" ? "bg-red-600 hover:bg-red-700 text-white" : ""}`}
                      onClick={() => field.onChange("decrement")}
                    >
                      <Minus className="h-4 w-4" />
                      Reducir
                    </Button>
                    <Button
                      type="button"
                      variant={field.value === "increment" ? "default" : "outline"}
                      className={`flex-1 gap-2 ${field.value === "increment" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                      onClick={() => field.onChange("increment")}
                    >
                      <Plus className="h-4 w-4" />
                      Incrementar
                    </Button>
                  </div>
                </Field>
              )}
            />

            {/* Cantidad */}
            <Controller
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Cantidad *</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="0"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                    }
                  />
                  {currentStock !== undefined && watchedQuantity !== undefined && (
                    <p className="text-xs text-muted-foreground">
                      Nuevo stock:{" "}
                      <span className="font-semibold">
                        {form.getValues('adjustmentType') === "increment"
                          ? currentStock + Number(watchedQuantity)
                          : currentStock - Number(watchedQuantity)}
                      </span>{" "}
                      unidades
                    </p>
                  )}
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Razón */}
            <Controller
              name="reason"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Razón *</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {reasons && (
                        <>
                          {reasons.map((item) => (
                            <SelectItem key={item.id} value={item.label} >
                              {item.label}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Nota */}
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='md:col-span-2'>

                  <FieldLabel htmlFor={field.name}>Nota (opcional)</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    rows={2}
                    aria-invalid={fieldState.invalid}
                    placeholder="Observaciones adicionales..."
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <div className="flex justify-end mt-10">
            <Button type="submit" form="form-rhf-demo" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Registrar Ajuste
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
