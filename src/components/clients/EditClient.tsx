import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { clientFormSchema, typeClient, typeDocument, type Client, type ClientFormValues } from '@/types/clients/clients.type';
import { editClientAction } from '@/actions/clients/edit-client.action';


interface Props {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>
  clientObj: Client
}

export default function EditClient({ openEdit, setOpenEdit, clientObj }: Props) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      razonSocial: '',
      typeClient: '',
      tipoDocumento: '',
      documentoId: '',
      phone: '',
      email: ''
    }
  });

  useEffect(() => {
    if (clientObj) {
      form.reset({
        razonSocial: clientObj.razonSocial,
        typeClient: clientObj.typeClient,
        tipoDocumento: clientObj.tipoDocumento,
        documentoId: clientObj.documentoId,
        phone: clientObj.phone,
        email:clientObj.email 
      })
    }
  }, [clientObj])

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: editClientAction,
    onError: (err: TypeError) => {
      toast.error(err.message)
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] }),
        toast.success(data);
    }
  });

  const onSubmit = (formData: ClientFormValues) => {
    mutate({ formData, clientId: clientObj._id })
    handleClose();
  }

  const handleClose = () => {
    setOpenEdit(false);
    form.reset();
  }

  return (
    <Dialog
      open={openEdit}
      onOpenChange={(isOpen) => {
        setOpenEdit(isOpen);
        if (!isOpen) {
          form.reset();
        }
      }}
    >

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Ingrese los nuevos datos del cliente
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-h-[80vh] overflow-y-auto pr-1"
        >
          {/* 🧑 DATOS PRINCIPALES */}
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              Datos del Cliente
            </div>

            <div className="grid gap-4">
              {/* Nombre grande */}
              <div>
                <Controller
                  control={form.control}
                  name="razonSocial"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Nombre / Razón Social *</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Ej. Juan Pérez / Empresa S.R.L."
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Tipo Cliente */}
                <Controller
                  name='typeClient'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Tipo Cliente *</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeClient?.map(item => (
                            <SelectItem key={item.id} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>
          </div>

          {/* 📄 DOCUMENTO */}
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              Documento
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Tipo Documento */}
              <Controller
                name='tipoDocumento'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Tipo Documento *</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        {typeDocument?.map(item => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Número */}
              <Controller
                control={form.control}
                name="documentoId"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nro Documento *</FieldLabel>
                    <Input {...field} placeholder="Ej. 723..." />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* 📞 CONTACTO */}
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              Contacto
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Teléfono */}
              <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Teléfono</FieldLabel>
                    <Input {...field} placeholder="Ej. 7254..." />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input {...field} placeholder="cliente@email.com" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* 🚀 FOOTER */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button type="submit">
              Aceptar
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}
