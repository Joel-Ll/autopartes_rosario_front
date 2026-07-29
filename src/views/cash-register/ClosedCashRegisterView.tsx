import { Navigate, useNavigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";

import { ClosedCashForm } from "@/components/cash-register/ClosedCashForm";
import { Button } from "@/components/ui/button";
import { Card, } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { getOneCashAction } from "@/actions/cash-register/get-one-cash.action";
import { ArrowLeft, Lock } from "lucide-react";


export default function ClosedCashRegisterView() {
  const navigate = useNavigate();
  const params = useParams();
  const cashRegisterId = params.cashRegisterId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cash-register', cashRegisterId],
    queryFn: () => getOneCashAction(cashRegisterId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!cashRegisterId
  })

  if (isLoading) return (
    <div className="max-w-7xl mx-auto flex justify-center">
      <Spinner />
    </div>
  )
  if (isError) return <Navigate to="/404" />;
  if (!data) return null;


  return (
    <div data-aos="fade-in" data-aos-duration="300">
      {isLoading ? (
        <div>Cargando...</div>
      ) : data ? (
        <div className="max-w-7xl mx-auto space-y-7">
          <Card className='p-0'>
            <div className="container mx-auto px-4 py-4">
              <Button variant="link" size="sm" onClick={() => navigate(-1)} className="mb-4 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver
              </Button>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                  <Lock className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-xl font-medium">Conciliar caja</p>

                  <p className="text-xs text-muted-foreground">
                    Reconcilia el efectivo en caja antes de cerrar el turno
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <ClosedCashForm
            data={data.cashRegister}
          />
        </div>
      ) : (
        <div>No hay datos disponibles</div>
      )}
    </div>
  )
}
