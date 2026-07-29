import { getSuppliersSelectAction } from '@/actions/suppliers/get-suppliers-active.action';
import { useQuery } from '@tanstack/react-query'

export const useSelectSupplier = () => {
  const { data } = useQuery({
    queryKey: ['suppliers-select'],
    queryFn: getSuppliersSelectAction,
    retry: false,
  });
  return {
    data
  }
}