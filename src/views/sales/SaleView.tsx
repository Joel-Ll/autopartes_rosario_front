import { Navigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";
import { getSaleAction } from "@/actions/sales/get-sale.action";
import DetailSale from "@/components/sales/sale/DetailSale";


export default function SaleView() {
  const params = useParams();
  const saleId = params.saleId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['sale', saleId],
    queryFn: () => getSaleAction(saleId),
    retry: false,
    enabled: !!saleId
  });


  if (isError) return <Navigate to="/404" />;

  return (
    <div className='space-y-8 mt-5 md:mt-0'>
      {isLoading ? (
        <div>Cargando...</div>
      ) : data ? (
        <>
          <DetailSale data={data}/>
        </>
      ) : (
        <div>No hay datos disponibles</div>
      )}
    </div>
  )
}
