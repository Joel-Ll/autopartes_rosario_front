import { useQuery } from '@tanstack/react-query'

import { columns } from '@/components/suppliers/columns'
import { DataTable } from '@/components/suppliers/data-table'
import { getSuppliersAction } from '@/actions/suppliers/get-suppliers.action'
import { StatsCard } from '@/components/suppliers/StatsCard'
import { ChartSupplier } from '@/components/suppliers/ChartSuppliers'


export default function SuppliersView() {
  const { data, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliersAction,
    retry: false,
    refetchOnWindowFocus: false
  });

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className='space-y-8'>
        {isLoading ? (
          <div>Cargando...</div>
        ) : data ? (
          <>
            <StatsCard stats={data.stats} />

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-6'>
              <div className='lg:col-span-2 xl:col-span-4'>
                <DataTable
                  columns={columns}
                  data={data.data}
                  isLoading={isLoading}
                />
              </div>
              <div className='lg:col-span-1 xl:col-span-2'>
                <ChartSupplier topSuppliers={data.charts} />
              </div>
            </div>
          </>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div>
  )
}
