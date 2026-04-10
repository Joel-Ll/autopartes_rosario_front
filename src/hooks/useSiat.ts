import { useQuery } from '@tanstack/react-query'
import { getProductsServicesSiatAction, getUnidadMedidaSiatAction } from '@/actions/siat/siat.action';

export const useProductsServicesSiat = () => {
  const { data } = useQuery({
    queryKey: ['products-services-siat'],
    queryFn: getProductsServicesSiatAction,
    retry: false,
  });
  return {
    data
  }
}

export const useUnidadMedidaSiat = () => {
  const { data } = useQuery({
    queryKey: ['unidad-medida-siat'],
    queryFn: getUnidadMedidaSiatAction,
    retry: false,
  });
  return {
    data
  }
}