import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getProductAction } from '@/actions/products/get-product.action';
import { useSelectSupplier } from '@/hooks/useSupplier';
import { toast } from 'sonner';
import { ImageIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { addStockFormSchema, type AddStockFormValues } from '@/types/products/products.type';
import type { SupplierActive } from '@/types/suppliers/suppliers.type';
import { registerPurchaseAction } from '@/actions/purchases/register-purchase.action';

export default function AddStockView() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId!;
  const { data: suppliersActive } = useSelectSupplier();
  const [suggestedPrice, setSuggestedPrice] = useState(0);

  const form = useForm<AddStockFormValues>({
    resolver: zodResolver(addStockFormSchema),
    defaultValues: {
      supplierId: undefined,
      quantity: '',
      purchasePrice: '',
      salePrice: '',
      lotNumber: '',
      sellingMargin: '',
      notes: ''
    },
  });

  const { data, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductAction(productId),
    enabled: !!productId,
    retry: false,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: registerPurchaseAction,
    onError: (error: TypeError) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      // TODO: Invalidar historial de compras
      toast.success(data);
      handleClose();
    }
  })

  useEffect(() => {
    const unitPrice = +form.watch('purchasePrice') || 0;
    const sellingMargin = +form.watch('sellingMargin') || 0;
    if (unitPrice > 0 && sellingMargin >= 0 && sellingMargin <= 100) {
      // Fórmula: Precio = Costo * (1 + (Margen/100))
      const calculatedPrice = unitPrice * (1 + (sellingMargin / 100));
      setSuggestedPrice(calculatedPrice);
    } else {
      setSuggestedPrice(0);
    }
  }, [form.watch('purchasePrice'), form.watch('sellingMargin')]);

  useEffect(() => {
    if (data) {
      const resetData = {
        image: data.image || "",
        code: data.code || "",
        description: data.description || "",
        category: String(data.category?._id || data.category || ""),
        supplier: String(data.supplier?._id || data.supplier || ""),
        brand: data.brand || "",
        unit: data.unit || "",
        salePrice: data.salePrice.toString() || '0'
      };
      setTimeout(() => {
        form.reset(resetData);
      }, 0);
    }
  }, [data, form]);

  const handleSubmit = (formData: AddStockFormValues) => {
    mutate({ formData, productId });
  }

  const handleClose = () => {
    form.reset();
    navigate(-1);
  }

  if (isError) {
    return <Navigate to={'/404'} />
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl">
          Transformar en ver mas detalles del producto
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Registrar nueva compra para: <span className="font-semibold text-primary">{data?.code}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sección Imagen */}
          <div className="lg:w-1/3">
            <div className="sticky top-6">
              <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                {data?.image ? (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={data.image}
                      alt="Imagen Producto"
                      className="h-64 w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
                      <ImageIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Sin imagen</p>
                    <p className="mt-1 text-xs text-gray-400">Agrega una imagen en la edición del producto</p>
                  </div>
                )}

                {/* Información clave en tarjetas */}
                <div className="mt-4 space-y-3">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                    <p className="text-xs font-medium text-blue-900">Stock Actual</p>
                    <p className="text-2xl font-bold text-blue-700">{data?.stock || 0} <span className="text-sm font-normal text-blue-600">{data?.unit || 'unidades'}</span></p>
                  </div>

                  <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                    <p className="text-xs font-medium text-amber-900">Último Precio de Compra</p>
                    <p className="text-xl font-bold text-amber-700">
                      Bs. {(data?.purchasePrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                    <p className="text-xs font-medium text-green-900">Precio de Venta Actual ({data?.sellingMargin}%)</p>
                    <p className="text-xl font-bold text-green-700">
                      Bs. {(data?.salePrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección Información y Formulario */}
          <div className="lg:w-2/3">
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 mb-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Información del Producto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Código</p>
                    <p className="font-mono text-sm font-semibold text-gray-800 bg-white px-3 py-1.5 rounded border">{data?.code}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Descripción</p>
                    <p className="text-sm text-gray-700 bg-white px-3 py-1.5 rounded border min-h-12">{data?.description || "Sin descripción"}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Categoría</p>
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 uppercase">
                      {data?.category?.name || "Sin categoría"}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Unidad de Venta</p>
                    <div className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                      {data?.unit === 'unit' ? 'Unitario' : data?.unit === 'kit' ? 'Juego' : data?.unit || 'Unitario'}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Proveedor Principal</p>
                    <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      {data?.supplier?.enterprise || "Sin proveedor"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AQUÍ IRÍA EL FORMULARIO DE ENTRADA */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Datos de la Nueva Entrada</h3>
              <Form {...form}>
                <FormDescription className='pb-5'>Los campos marcados con (*) son obligatorios</FormDescription>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" >
                  <div className="grid gap-6 md:grid-cols-2">

                    {/* Proveedor */}
                    <FormField
                      control={form.control}
                      name="supplierId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proveedor <span className='text-red-500'>*</span></FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger className='w-auto'>
                                <SelectValue placeholder="Selecciona Proveedor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {suppliersActive && suppliersActive.length > 0 ? (
                                <>
                                  {suppliersActive.map((item: SupplierActive) => (
                                    <SelectItem key={item._id} value={item._id} >
                                      {item.enterprise}
                                    </SelectItem>
                                  ))}
                                </>
                              ) : (
                                <>
                                  <SelectItem disabled value="no-data">
                                    No hay registros
                                  </SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* No. Factura / Lote */}
                    <FormField
                      control={form.control}
                      name="lotNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>N° Factura / Lote</FormLabel>
                          <FormControl >
                            <Input {...field} placeholder='Ej. 00012' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cantidad Entrante */}
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad <span className='text-red-500'>*</span></FormLabel>
                          <FormControl >
                            <Input required type='number' {...field} min={0} placeholder='Ej. 12' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Precio de Compra */}
                    <FormField
                      control={form.control}
                      name="purchasePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio de Compra (Bs.) <span className='text-red-500'>*</span></FormLabel>
                          <FormControl >
                            <Input type='number' {...field} min={0} step="0.01" required placeholder='Precio Unitario' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Margen Sugerido */}
                    <FormField
                      control={form.control}
                      name="sellingMargin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Margen Sugerido (%)<span className='text-red-500'>*</span></FormLabel>
                          <FormControl >
                            <Input type='number' {...field} min={1} step="0.01" placeholder='Ej: 30' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Precio Sugerido */}
                    <FormItem>
                      <FormLabel>Precio Sugerido (Bs.)</FormLabel>
                      <Input
                        type="text"
                        value={suggestedPrice.toFixed(2)}
                        disabled
                        readOnly
                        className="bg-green-50 text-green-700 font-semibold pr-10"
                      />
                    </FormItem>

                    {/* Precio Final */}
                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio al cliente (Bs.)<span className='text-red-500'>*</span></FormLabel>
                          <FormControl >
                            <Input type='number' {...field} min={0} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Descripción */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notas<span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Compra de..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col md:flex-row gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleClose()}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Registrar Producto
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
