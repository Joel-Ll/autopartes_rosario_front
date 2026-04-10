import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query'
import { getPurchaseAction } from '@/actions/purchases/get-purchase.action';
import { EditPurchaseForm } from '@/components/purchases/EditPurchaseForm';
import { Spinner } from '@/components/ui/spinner';

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
      <div className="pb-5">
        <h1 className="text-2xl lg:text-3xl font-bold">Editar Compra</h1>
        {isLoading &&
          <div className="flex justify-center items-center">
            <Spinner className="h-8 w-8" />
          </div>
        }
        {data && (<EditPurchaseForm data={data} />)}
      </div>
    </div>
  )
}
