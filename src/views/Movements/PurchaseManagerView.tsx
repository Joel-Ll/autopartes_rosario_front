import { useQuery } from '@tanstack/react-query';
import {  Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/purchases/data-table';
import { columns } from '@/components/purchases/columns';
import { useNavigate } from 'react-router';
import { getPurchasesAction } from '@/actions/purchases/get-purchases.action';

export default function PurchaseManagerView() {
  const navigate = useNavigate();

  const { data = [], isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: getPurchasesAction,
    retry: false,
  })

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className="flex flex-col tems-center gap-5 lg:flex-row lg:justify-between pb-5">
        <h1 className="text-2xl lg:text-3xl font-bold">Historial de Compras</h1>
        <Button size={'lg'} className='gap-2' onClick={() => navigate('/purchases/new')}>
          <Plus className="h-5 w-5" />
          Nueva Compra
        </Button>
      </div>

      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  )
}
