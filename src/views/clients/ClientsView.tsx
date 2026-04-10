import { getClientsAction } from '@/actions/clients/get-clients.action';
import { columns } from '@/components/clients/columns';
import { DataTable } from '@/components/clients/data-table';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ClientsView() {

  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClientsAction,
    retry: false
  });

  return (
    <>
      <div className="flex flex-col tems-center gap-5 lg:flex-row lg:justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold">Clientes</h1>
        <Button size={'lg'} className='gap-2' onClick={() => navigate('/products/new')}>
          <Plus className="h-5 w-5" />
          Nuevo Cliente
        </Button>
      </div>
      
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </>
  )
}
