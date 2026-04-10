import { useQuery } from '@tanstack/react-query'
import { getSuppliersActiveAction } from '@/actions/suppliers/get-suppliers-active.action';

export const useSelectSupplier = () => {
  const { data } = useQuery({
    queryKey: ['suppliers-active'],
    queryFn: getSuppliersActiveAction,
    retry: false,
  });
  return {
    data
  }
}