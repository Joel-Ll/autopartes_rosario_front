import { CreatePurchaseForm } from '@/components/purchases/CreatePurchaseForm';

export const CreatePurchaseView = () => {
  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className="pb-5">
        <h1 className="text-2xl lg:text-3xl font-bold">Registro de Compra</h1>
        <CreatePurchaseForm />
      </div>
    </div>
  )
}
