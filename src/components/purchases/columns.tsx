import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from "@tanstack/react-table"
import { Edit2, EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/utils'

import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button"

import type { PurchaseData } from '@/types/purchases/purchases-type'
import { CancelPurchase } from './CancelPurchase'
import { DetailPurchase } from './DetailPurchase'


export const columns: ColumnDef<PurchaseData>[] = [
  // Proveedor
  {
    accessorKey: "supplier",
    header: () => (
      <div className='w-32'>Proveedor</div>
    ),
    cell: ({ row }) => {
      return <div>{row.original.supplier.enterprise}</div>
    },
    filterFn: (row, _, filterValue) => {
      const supplierId = row.original.supplier._id;
      return supplierId === filterValue;
    },
  },
  // Nro fac
  {
    accessorKey: "invoiceNumber",
    header: () => (
      <div className='w-32'>N° Factura / Lote</div>
    ),
    cell: ({ row }) => {
      return <div>{row.original.invoiceNumber}</div>
    }
  },
  // Date
  {
    accessorKey: "date",
    header: () => <div className='w-32'>Fecha</div>,
    cell: ({ row }) => {
      const date = formatDate(new Date(row.getValue('date')));

      return (
        <div className="text-sm">
          {date}
        </div>
      );
    }
  },
  // products
  {
    accessorKey: "products",
    header: () => (
      <div className='w-32'>Productos</div>
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={'outline'}>{row.original.products} Productos</Badge>
      )
    }
  },
  // Monto total
  {
    accessorKey: "totalAmount",
    header: () => (
      <div className='w-32'>Monto Total</div>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (

        <>
          {status === 'realized' ? (
            <p className='text-sky-600 font-medium'>Bs. {formatCurrency(row.original.totalAmount)}</p>
          ) : (
            <p className='text-red-700 line-through font-medium'>Bs. {formatCurrency(row.original.totalAmount)}</p>
          )}
        </>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => (
      <div className='w-32'>Estado</div>
    ),
    cell: ({ row }) => {
      const state = row.original.status
      return (
        <>
          {state === 'realized' ? (
            <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              Realizado
            </Badge>
          ) : (
            <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
              Anulado
            </Badge>
          )}
        </>
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
              {purchase.status === 'realized' ? (
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
            purchaseId={purchaseId}
            openView={openView}
            setOpenView={setOpenView}
          />
        </>
      )
    }
  }
]