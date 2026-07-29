import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";

import { getProductAction } from "@/actions/products/get-product.action";
import { ProductDetail } from "@/components/products/ProductDetail";


export default function DetailProductView() {
  const params = useParams();
  const productId = params.productId!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductAction(productId),
    enabled: !!productId,
    retry: false,
  });

  if (isError) {
    return <Navigate to={'/404'} />
  }

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      {isLoading ? (
        <div>Cargando...</div>
      ) : data ? (
        <>
          <ProductDetail data={data}/>
        </>
      ) : (
        <div>Sin datos para mostrar...</div>
      )}
    </div>
  )
}
