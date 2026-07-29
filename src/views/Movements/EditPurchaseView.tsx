import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query'

import { getPurchaseAction } from '@/actions/purchases/get-purchase.action';
import { EditPurchaseForm } from '@/components/purchases/EditPurchaseForm';
import { Spinner } from '@/components/ui/spinner';
import { Edit2 } from 'lucide-react';

export default function EditPurchaseView() {
  const params = useParams();
  const purchaseId = params.purchaseId!;

  const { data, isLoading } = useQuery({
    queryKey: ['purchase', purchaseId],
    queryFn: () => getPurchaseAction(purchaseId),
    retry: false
  });

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Edit2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Editar Compra</h1>
          <p className="text-sm text-muted-foreground">Llene los campos del formulario para editar</p>
        </div>
      </div>


      {isLoading &&
        <div className="flex justify-center items-center">
          <Spinner className="h-8 w-8" />
        </div>
      }
      {data && (<EditPurchaseForm data={data} />)}
    </div>
  )
}