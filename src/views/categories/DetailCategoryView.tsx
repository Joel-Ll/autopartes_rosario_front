import { Navigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getCategoryAction } from '@/actions/categories/get-category.action';
import { DetailCategory } from '@/components/categories/DetailCategory';
import { Spinner } from '@/components/ui/spinner';

export const DetailCategoryView = () => {
  const params = useParams();
  const categoryId = params.categoryId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryAction(categoryId),
    retry: false,
    enabled: !!categoryId
  });

  if (isLoading) return (
    <div className="max-w-7xl mx-auto flex justify-center">
      <Spinner />
    </div>
  )
  if (isError) return <Navigate to="/404" />;
  if (!data) return null;

  return (
    <DetailCategory data={data} />
  )
}
