import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import type { Adjustment } from '@/types/adjustments/adjustments.type';
import { DetailAdjustment } from './DetailAdjustment';
import { formatDate } from "@/utils";

interface Props {
  data: Adjustment[]
}

export const AdjustmentsHistory = ({ data }: Props) => {
  const [openView, setOpenView] = useState(false);
  const [adjustmentId, setAdjustmentId] = useState('');

  const handleView = (id: string) => {
    setAdjustmentId(id);
    setOpenView(true);
  }

  return (
    <>
      <Card className='my-10'>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Historial de Ajustes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No hay ajustes registrados
                  </TableCell>
                </TableRow>
              ) : (
                data.map((adj) => (
                  <TableRow key={adj._id}>
                    <TableCell className="text-sm">{formatDate(new Date(adj.createdAt))}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{adj.product.description}</p>
                        <p className="text-xs text-muted-foreground">#{adj.product.internalCode} • {adj.product.catalogCode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <>
                        {adj.adjustmentType === 'increment' ? (
                          <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                            Incremento
                          </Badge>
                        ) : (
                          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                            Reducción
                          </Badge>
                        )}
                      </>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      <span className={adj.adjustmentType === "increment" ? "text-sky-600" : "text-red-600"}>
                        {adj.adjustmentType === "increment" ? "+" : "-"}{adj.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{adj.reason}</TableCell>
                    <TableCell className="text-center text-sm">
                      <span className="text-muted-foreground">{adj.previousStock}</span>
                      {" → "}
                      <span className="font-semibold">{adj.newStock}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(adj._id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card >

      <DetailAdjustment
        openView={openView}
        setOpenView={setOpenView}
        adjustmentId={adjustmentId}
        setAdjustmentId={setAdjustmentId}
      />
    </>
  )
}
