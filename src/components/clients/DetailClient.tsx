import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { clientFormSchema, typeClient, typeDocument, type Client, type ClientFormValues } from '@/types/clients/clients.type';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, Phone, User, Hash } from 'lucide-react';
import { formatDate } from '@/utils';

interface Props {
  openView: boolean;
  setOpenView: Dispatch<SetStateAction<boolean>>
  clientObj: Client
}

export default function DetailClient({ openView, setOpenView, clientObj }: Props) {
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
        email: clientObj.email
      });
    }
  }, [clientObj, form]);

  const handleClose = () => {
    setOpenView(false);
    form.reset();
  };

  // Helper para obtener label del tipo cliente
  const getTypeClientLabel = (value: string) => {
    return typeClient.find(item => item.value === value)?.label || value;
  };

  // Helper para obtener label del tipo documento
  const getTypeDocumentLabel = (value: string) => {
    return typeDocument.find(item => item.value === value)?.label || value;
  };

  return (
    <Dialog open={openView} onOpenChange={setOpenView}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalles del Cliente
          </DialogTitle>
          <DialogDescription>
            Información completa del cliente registrado en el sistema
          </DialogDescription>
        </DialogHeader>


        {/* 🧑 INFORMACIÓN PRINCIPAL */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 ">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Información Principal</h3>
          </div>

          <div className="space-y-4">
            <Controller
              control={form.control}
              name="razonSocial"
              render={({ field }) => (
                <div>
                  <FieldLabel className="text-xs text-muted-foreground">
                    Nombre / Razón Social
                  </FieldLabel>
                  <div className="mt-1 p-2 bg-muted/30 rounded-md border">
                    <p className="text-sm font-medium">{field.value || '-'}</p>
                  </div>
                </div>
              )}
            />

            <Controller
              name='typeClient'
              control={form.control}
              render={({ field }) => (
                <div>
                  <FieldLabel className="text-xs text-muted-foreground">
                    Tipo Cliente
                  </FieldLabel>
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-sm">
                      {getTypeClientLabel(field.value)}
                    </Badge>
                  </div>
                </div>
              )}
            />
          </div>
        </div>

        {/* 📄 INFORMACIÓN DE DOCUMENTO */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Documento de Identidad</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name='tipoDocumento'
              control={form.control}
              render={({ field }) => (
                <div>
                  <FieldLabel className="text-xs text-muted-foreground">
                    Tipo Documento
                  </FieldLabel>
                  <div className="mt-1 p-2 bg-muted/30 rounded-md border">
                    <p className="text-sm">{getTypeDocumentLabel(field.value)}</p>
                  </div>
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="documentoId"
              render={({ field }) => (
                <div>
                  <FieldLabel className="text-xs text-muted-foreground">
                    Número de Documento
                  </FieldLabel>
                  <div className="mt-1 p-2 bg-muted/30 rounded-md border font-mono">
                    <p className="text-sm">{field.value || '-'}</p>
                  </div>
                </div>
              )}
            />
          </div>
        </div>

        {/* 📞 INFORMACIÓN DE CONTACTO */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Contacto</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="phone"
              render={({ field }) => (
                <div>
                  <FieldLabel className="text-xs text-muted-foreground">
                    Teléfono
                  </FieldLabel>
                  <div className="mt-1 p-2 bg-muted/30 rounded-md border">
                    <p className="text-sm">{field.value || '-'}</p>
                  </div>
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <div>
                  <FieldLabel className="text-xs text-muted-foreground">
                    Correo Electrónico
                  </FieldLabel>
                  <div className="mt-1 p-2 bg-muted/30 rounded-md border">
                    <p className="text-sm break-all">{field.value || '-'}</p>
                  </div>
                </div>
              )}
            />
          </div>
        </div>

        {/* ℹ️ METADATOS (opcional - si tienes fechas de creación/actualización) */}
        {clientObj.createdAt && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Información Adicional</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              {clientObj.createdAt && (
                <div>
                  <span className="font-medium">Creado:</span>
                  <p>{formatDate(new Date(clientObj.createdAt))}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🚀 FOOTER */}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}