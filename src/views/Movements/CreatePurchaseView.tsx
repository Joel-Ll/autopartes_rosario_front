import { CreatePurchaseForm } from '@/components/purchases/CreatePurchaseForm';
import { ListCheck  } from 'lucide-react';

export const CreatePurchaseView = () => {
  return (
    <div  data-aos="fade-in" data-aos-duration="300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <ListCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nueva Compra</h1>
          <p className="text-sm text-muted-foreground">
            Registra el ingreso de mercadería respaldado por una compra
          </p>
        </div>
      </div>
      <CreatePurchaseForm />
    </div>
  )
}
