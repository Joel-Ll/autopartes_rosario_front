import { getUserAuthAction } from '@/actions/auth/get-user.action';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['userAuth'],
    queryFn: getUserAuthAction,
    retry: false,
  });

  return { data, isError, isLoading }
}