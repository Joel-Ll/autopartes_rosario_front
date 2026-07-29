import { useQuery } from '@tanstack/react-query'
import { columns } from '@/components/products/columns'
import { DataTable } from '@/components/products/data-table'
import { getProductsAction } from '@/actions/products/get-products.action'
import { StatsCard } from '@/components/products/StastsCard'

export const ProductsView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProductsAction,
    retry: false
  });

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className='space-y-8'>
        {isLoading ? (
          <div>Cargando...</div>
        ) : data ? (
          <>
            <StatsCard stats={data.stats} />
            <DataTable columns={columns} data={data.products} isLoading={isLoading} />
          </>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div>
  )
}
