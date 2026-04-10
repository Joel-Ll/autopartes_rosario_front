import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { columns } from '@/components/products/columns'
import { DataTable } from '@/components/products/data-table'
import { Button } from '@/components/ui/button'
import { getProductsAction } from '@/actions/products/get-products.action'


export const ProductsView = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProductsAction,
    retry: false
  });

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className="flex flex-col tems-center gap-5 lg:flex-row lg:justify-between pb-5">
        <h1 className="text-2xl lg:text-3xl font-bold">Gestión de Productos</h1>
        <Button size={'lg'} className='gap-2' onClick={() => navigate('/products/new')}>
          <Plus className="h-5 w-5" />
          Registrar Producto
        </Button>
      </div>

      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  )
}
