import { useQuery } from '@tanstack/react-query'

import { columns } from '@/components/categories/columns'
import { DataTable } from '@/components/categories/data-table'
import { getCategoriesAction } from '@/actions/categories/get-categories.action'

export default function CategoriesView() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAction,
    retry: false
  })

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  )
}
