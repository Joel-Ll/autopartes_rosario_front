import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";

import { StatsCard } from "@/components/sales/StatsCard";
import { DataTable } from "@/components/sales/data-table";
import { columns } from "@/components/sales/columns";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getSalesAction } from "@/actions/sales/get-sales.action";
import { CalendarIcon, FilterX } from "lucide-react";
import { formatDate } from "date-fns"
import { es } from "date-fns/locale";

export default function SaleHistory() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: ''
  });
  const hasFilters = !!filters.fromDate && !!filters.toDate;

  const { data, isLoading } = useQuery({
    queryKey: ['sales', filters],
    queryFn: () => getSalesAction(filters),
    retry: false,
  });

  const applyFilters = () => {
    if (!date?.from || !date?.to) return;

    setFilters({
      fromDate: date.from.toISOString(),
      toDate: date.to.toISOString(),
    });
  };

  const clearFilters = () => {
    setDate(undefined);

    setFilters({
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <div className="flex flex-col lg:items-center lg:flex-row lg:justify-between  gap-5 mb-5">
        <h2 className="text-2xl font-bold text-muted-foreground">Historial de ventas</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* DATE RANGE */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start min-w-[280px] font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {date?.from ? (
                  date.to ? (
                    <>
                      {formatDate(date.from, "dd MMM yyyy", { locale: es })} -{" "}
                      {formatDate(date.to, "dd MMM yyyy", { locale: es })}
                    </>
                  ) : (
                    formatDate(date.from, "dd MMM yyyy", { locale: es })
                  )
                ) : (
                  <span className="text-muted-foreground">
                    Seleccionar rango
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>

          {/* ACTION BUTTON */}
          {!hasFilters ? (
            <Button
              onClick={applyFilters}
              disabled={!date?.from || !date?.to}
            >
              Aplicar filtro
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={clearFilters}
              className="gap-2"
            >
              <FilterX className="h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>
      </div>


      <div className='space-y-8 mt-5 md:mt-0'>
        {isLoading ? (
          <div>Cargando...</div>
        ) : data ? (
          <>
            <StatsCard stats={data.stats} />
            <DataTable columns={columns} data={data.sales} isLoading={isLoading} />
          </>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div>
  )
}
