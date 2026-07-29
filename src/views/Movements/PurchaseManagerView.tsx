import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/purchases/data-table';
import { columns } from '@/components/purchases/columns';
import { getPurchasesAction } from '@/actions/purchases/get-purchases.action';
import { StatsCard } from '@/components/purchases/StastsCard';

export default function PurchaseManagerView() {

  const { data, isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: getPurchasesAction,
    retry: false,
  })

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className='space-y-8'>
        {isLoading ? (
          <div>Cargando...</div>
        ) : data ? (
          <>
            <StatsCard stats={data.stats} />
            <DataTable columns={columns} data={data.data} isLoading={isLoading} />
          </>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div>
  )
}
