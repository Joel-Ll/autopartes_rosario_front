import { useClients } from '@/hooks/useClients';
import { columns } from '@/components/clients/columns';
import { DataTable } from '@/components/clients/data-table';
import { StatsCard } from '@/components/clients/StastsCard';

export default function ClientsView() {
  const { data, isLoading} = useClients();

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className='space-y-8'>
        {isLoading ? (
          <div>Cargando...</div>
        ) : data ? (
          <>
            <StatsCard stats={data.stats} />
            <DataTable columns={columns} data={data.clients} isLoading={isLoading} />
          </>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div>
  )
}
