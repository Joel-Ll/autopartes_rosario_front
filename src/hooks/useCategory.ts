import { useQuery } from '@tanstack/react-query'
import { getCategoriesActiveAction } from '@/actions/categories/get-categories-active.action';

export const useSelectCategory = () => {
  const { data } = useQuery({
    queryKey: ['categories-active'],
    queryFn: getCategoriesActiveAction,
    retry: false,
  });
  return {
    data
  }
}