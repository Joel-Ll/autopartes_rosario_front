import { getClientsAction } from '@/actions/clients/get-clients.action';
import { useQuery } from '@tanstack/react-query'

export const useClients = () => {
  const { data, isLoading} = useQuery({
    queryKey: ['clients'],
    queryFn: getClientsAction,
    retry: false
  });

  return {
    data,
    isLoading
  }
}