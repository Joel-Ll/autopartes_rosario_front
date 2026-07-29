import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import AddCashRegister from "../AddCashRegister";

export default function CashRegisterEmpty() {
  return (
    <Card className="h-fit">
      <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">

        <Wallet className="h-12 w-12 text-muted-foreground" />

        <div className="text-center">
          <h3 className="font-semibold">
            No existe una caja abierta
          </h3>

          <p className="text-sm text-muted-foreground">
            Abra una nueva caja para comenzar a registrar ventas.
          </p>
        </div>

        <AddCashRegister />

      </CardContent>
    </Card>
  )
}
