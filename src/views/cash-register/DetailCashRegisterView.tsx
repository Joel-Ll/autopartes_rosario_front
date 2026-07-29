import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";

import { CashRegisterInfoCard } from "@/components/cash-register/cashRegister/CashRegisterInfoCard";
import { RegisterInternalMovement } from "@/components/cash-register/cashRegister/RegisterInternalMovement";
import { StatsCard } from "@/components/cash-register/cashRegister/StastsCard";
import { columns } from "@/components/cash-register/cashRegister/columns";
import { DataTable } from "@/components/cash-register/cashRegister/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils";
import { getOneCashAction } from "@/actions/cash-register/get-one-cash.action";
import { ArrowLeft, Check, Plus, Wallet } from "lucide-react";

const statusConfig = {
  open: { label: "Abierta", className: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" },
  completed: { label: "Completada", className: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
  with_difference: { label: "Con diferencia", className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" },
};

export default function DetailCashRegisterView() {
  const [open, setOpen] = useState(false);
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

  if (isError) return <Navigate to="/404" />;


  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className='space-y-8'>
        {isLoading ? (
          <div>Cargando...</div>
        ) : data ? (
          <>
            <Card className="p-0">
              <div className="px-5 py-5">

                <Button
                  variant="link"
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="mb-5 px-0 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a cajas
                </Button>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  {/* Información */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold">
                          {data.cashRegister.code}
                        </h1>

                        <Badge className={statusConfig[data.cashRegister.status].className}>
                          {statusConfig[data.cashRegister.status].label}
                        </Badge>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">

                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                          {data.cashRegister.user
                            .split(" ")
                            .map(w => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <span>{data.cashRegister.user}</span>

                        <span className="hidden sm:inline">•</span>

                        <span>
                          Desde {formatDate(new Date(data.cashRegister.openedAt))}
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* Acciones */}
                  {statusConfig[data.cashRegister.status].label === 'Abierta' && (

                    <div className="flex w-full flex-col gap-3 md:flex-row  md:w-auto">
                      <Button
                        variant="outline"
                        onClick={() => setOpen(true)}
                        className="w-full md:w-auto"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Registrar movimiento
                      </Button>

                      <Button
                        onClick={() => navigate(`/cash-register/closed/${cashRegisterId}`)}
                        className="w-full md:w-auto"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Conciliar caja
                      </Button>

                    </div>
                  )}
                </div>

              </div>
            </Card>

            <StatsCard stats={data.stats} />

            <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-6'>
              <div className='lg:col-span-2 xl:col-span-4'>
                <DataTable
                  columns={columns}
                  data={data.movements}
                  isLoading={isLoading}
                />
              </div>

              <div className="lg:col-span-1 xl:col-span-2">
                <CashRegisterInfoCard cashRegister={data.cashRegister} />
              </div>
            </div>
          </>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>

      <RegisterInternalMovement
        cashRegisterId={cashRegisterId}
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}