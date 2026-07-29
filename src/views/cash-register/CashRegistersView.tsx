import { useQuery } from '@tanstack/react-query';

import { getAllCaschAction } from '@/actions/cash-register/get-all-cash.action';
import CashRegisterEmpty from '@/components/cash-register/cashRegisters/CashRegisterEmpty';
import { columns } from '@/components/cash-register/cashRegisters/columns';
import { DataTable } from '@/components/cash-register/cashRegisters/data-table';
import { StatsCard } from '@/components/cash-register/cashRegisters/StastsCard';
import SummaryCashRegisterOpen from '@/components/cash-register/cashRegisters/SummaryCashRegisterOpen';

export default function CashRegistersView() {
  const { data, isLoading } = useQuery({
    queryKey: ['cash-all'],
    queryFn: getAllCaschAction,
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

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-6'>
              <div className='lg:col-span-2 xl:col-span-4'>
                <DataTable
                  columns={columns}
                  data={data.data}
                  isLoading={isLoading}
                />
              </div>
              <div className='lg:col-span-1 xl:col-span-2'>
                {data.currentCash ? (
                  <SummaryCashRegisterOpen currentCash={data.currentCash} />
                ) : (
                  <CashRegisterEmpty />
                )}
              </div>
            </div>
          </>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div >
  )
}
