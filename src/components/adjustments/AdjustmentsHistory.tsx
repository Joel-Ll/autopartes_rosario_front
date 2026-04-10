import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye} from "lucide-react";
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
import type { Adjustment } from '@/types/adjustments/adjustments.type';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from 'react';
import { DetailAdjustment } from './DetailAdjustment';

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
                    <TableCell className="text-sm">{adj.createdAt}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{adj.product.description}</p>
                        <p className="text-xs text-muted-foreground">{adj.product.code}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          adj.adjustmentType === "increment"
                            ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                            : "border-red-500 text-red-600 bg-red-50"
                        }
                      >
                        {adj.adjustmentType === "increment" ? "Incremento" : "Reducción"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      <span className={adj.adjustmentType === "increment" ? "text-emerald-600" : "text-red-600"}>
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
                        onClick={ () => handleView(adj._id)}
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
      <CardFooter>
        {/* Hacer funcionar la paginacion */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
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
