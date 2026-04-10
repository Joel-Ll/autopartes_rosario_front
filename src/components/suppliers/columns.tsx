import { useState } from 'react'
import type { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Supplier } from '@/types/suppliers/suppliers.type'
import EditSupplier from './EditSupplier'


export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "enterprise",
    header: () => (
      <div className='w-32'>Empresa</div>
    ),
    cell: ({ row }) => {
      return <div className='capitalize'>{row.getValue('enterprise')}</div>
    }
  },
  {
    accessorKey: "name",
    header: () => (
      <div className='w-32'>Promotor</div>
    ),
    cell: ({ row }) => {
      return <div className='capitalize'>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: 'phone',
    header: () => (
      <div className='w-32'>Teléfono</div>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('phone')}</div>
    }
  },
  {
    accessorKey: 'address',
    header: () => (
      <div className='w-32'>Dirección</div>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('address')}</div>
    }
  },
  {
    accessorKey: "isActive",
    header: () => <div className="w-28">Estado</div>,
    cell: ({ row }) => {
      const isActive: boolean = row.getValue('isActive');

      return (
        <Badge variant={'outline'} className={
          isActive
            ? "border-emerald-500 text-emerald-600 bg-emerald-50"
            : "border-red-500 text-red-600 bg-red-50"
        }>
          {isActive ? "Activo" : "Inactivo"}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    header: () => <div className="w-28">Acciones</div>,
    cell: ({ row }) => {
      const supplierId = row.original._id
      const [open, setOpen] = useState(false);
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
              <DropdownMenuItem
                onClick={() => setOpen(true)}
              >Editar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditSupplier
            open={open}
            setOpen={setOpen}
            supplierId={supplierId}
          />
        </>
      )
    },
  },
]