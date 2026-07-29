import { useQuery } from '@tanstack/react-query'

import { columns } from '@/components/categories/columns'
import { DataTable } from '@/components/categories/data-table'
import { getCategoriesAction } from '@/actions/categories/get-categories.action'
import { StatsCard } from '@/components/categories/StastsCard'
import ChartCategories from '@/components/categories/ChartCategories'

export default function CategoriesView() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAction,
    retry: false
  })


  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className='space-y-8'>
        {isLoading ? (
          <div>Cargando...</div>
        ) : data ? (
          <>
            <StatsCard stats={data.stats} />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-6">
              <div className="lg:col-span-2 xl:col-span-4">
                <DataTable
                  columns={columns}
                  data={data.data}
                  isLoading={isLoading}
                />
              </div>

              <div className="lg:col-span-1 xl:col-span-2">
                <ChartCategories
                  topCategories={data.charts.topCategories}
                />
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
