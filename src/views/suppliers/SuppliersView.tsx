import { useQuery } from '@tanstack/react-query'

import { columns } from '@/components/suppliers/columns'
import { DataTable } from '@/components/suppliers/data-table'
import { getSuppliersAction } from '@/actions/suppliers/get-suppliers.action'

export default function SuppliersView() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliersAction,
    retry: false
  })

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <DataTable columns={columns} data={data} isLoading={isLoading}/>
    </div>
  )
}
