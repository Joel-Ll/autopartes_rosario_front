import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from "@tanstack/react-table"
import { Edit2, EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/utils'

import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { Purchase } from '@/types/purchases/purchases-type'
import { Button } from "@/components/ui/button"
import { CancelPurchase } from './CancelPurchase'
import { DetailPurchase } from './DetailPurchase'


export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "date",
    header: () => <div className='w-32'>Fecha de compra</div>,
    cell: ({ row }) => {
      const date = formatDate(new Date(row.getValue('date')));

      return (
        <div className="text-sm">
          {date}
        </div>
      );
    }
  },
  {
    accessorKey: "invoiceNumber",
    header: () => (
      <div className='w-32'>N° Factura / Lote</div>
    ),
    cell: ({ row }) => {
      return <div>{row.original.invoiceNumber}</div>
    }
  },
  {
    accessorKey: "supplier_enterprise",
    header: () => (
      <div className='w-32'>Proveedor</div>
    ),
    cell: ({ row }) => {
      return <div>{row.original.supplier.enterprise}</div>
    }
  },
  {
    accessorKey: "detail",
    header: () => (
      <div className='w-32'>Nota</div>
    ),
    cell: ({ row }) => {
      return <div>{row.original.detail}</div>
    }
  },
  {
    accessorKey: "totalAmount",
    header: () => (
      <div className='w-32'>Monto Total (Bs.)</div>
    ),
    cell: ({ row }) => {
      return <div>{formatCurrency(row.original.totalAmount)}</div>
    }
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: () => (
      <div className='w-32'>Estado</div>
    ),
    cell: ({ row }) => {
      const state = row.original.status
      return (
        <Badge variant={'outline'} className={
          state === "active"
            ? "border-emerald-500 text-emerald-600 bg-emerald-50"
            : "border-red-500 text-red-600 bg-red-50"
        }>
          {state === 'active' ? "Registrado" : "Anulado"}
        </Badge>
      )
    }
  },
  {
    id: "Acciones",
    header: () => <div className="w-28">Acciones</div>,
    cell: ({ row }) => {
      const purchase = row.original;
      const navigate = useNavigate();
      const purchaseId = row.original._id
      const [openCancel, setOpenCancel] = useState(false);
      const [openView, setOpenView] = useState(false);



      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {purchase.status === 'active' ? (
                <>
                  <DropdownMenuItem onClick={() => {
                    setOpenView(true)
                  }} >
                    <EyeIcon />
                    Ver
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate(`/purchases/edit/${purchaseId}`)} >
                    <Edit2 />
                    Editar
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setOpenCancel(true)}>
                    <Trash2 />
                    Anular
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => {
                  setOpenView(true)
                }} >
                  <EyeIcon />
                  Ver
                </DropdownMenuItem>
              )}

            </DropdownMenuContent>
          </DropdownMenu>

          <CancelPurchase
            openCancel={openCancel}
            setOpenCancel={setOpenCancel}
            purchaseId={purchaseId}
          />

          <DetailPurchase
            purchase={purchase}
            openView={openView}
            setOpenView={setOpenView}
          />
        </>
      )
    }
  }
]