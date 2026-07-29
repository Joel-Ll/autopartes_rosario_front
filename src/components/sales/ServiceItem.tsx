import type { UseFormSetValue } from "react-hook-form";
import type { SalesFormValues } from "@/types/sales/sales.type";
import { formatCurrency } from "@/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";


interface Props {
  service: {
    description: string;
    amount: number;
    id: number;
  },
  services: {
    description: string;
    amount: number;
    id: number;
  }[];
  setValue: UseFormSetValue<SalesFormValues>,
}

export default function ServiceItem({ service, services, setValue }: Props) {

  const removeService = (id: number) => {
    const updated = services.filter((s) => s.id !== id);
    setValue("services", updated);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-sm text-muted-foreground">
        {service.description}
      </p>

      <div className="flex items-center gap-1">
        <span className="font-semibold text-sm">
          Bs. {formatCurrency(service.amount)}
        </span>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => removeService(service.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  )
}
