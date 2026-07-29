import { useQuery } from '@tanstack/react-query'
import { getAdjustmentsAction } from '@/actions/adjustments/get-adjustments.action'
import { AdjustmentsForm } from '@/components/adjustments/AdjustmentsForm'
import { AdjustmentsHistory } from '@/components/adjustments/AdjustmentsHistory'

export const AdjustmentsView = () => {

  const { data = [] } = useQuery({
    queryKey: ['adjustments'],
    queryFn: getAdjustmentsAction,
    retry: false
  })

  return (
    <div  data-aos="fade-in" data-aos-duration="300">

      <div className='space-y-8'>
        <AdjustmentsForm />

        <AdjustmentsHistory 
          data={data}
        />
      </div>
    </div>
  )
}
