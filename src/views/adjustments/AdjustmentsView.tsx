import { getAdjustmentsAction } from '@/actions/adjustments/get-adjustments.action'
import { AdjustmentsForm } from '@/components/adjustments/AdjustmentsForm'
import { AdjustmentsHistory } from '@/components/adjustments/AdjustmentsHistory'
import { useQuery } from '@tanstack/react-query'

export const AdjustmentsView = () => {

  const { data = [] } = useQuery({
    queryKey: ['adjustments'],
    queryFn: getAdjustmentsAction,
    retry: false
  })

  console.log(data);


  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <h1 className="text-3xl font-bold mb-6">Ajustes de Stock</h1>

      <div className='space-y-6'>
        <AdjustmentsForm />

        <AdjustmentsHistory 
          data={data}
        />
      </div>
    </div>
  )
}
