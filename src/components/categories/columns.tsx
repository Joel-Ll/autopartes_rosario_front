import { useState } from 'react'
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/types/categories/categories.types'
import EditCategory from './EditCategory'
import { formatDate } from '@/utils'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "createdAt",
    header: () => <div className='w-52'>Fecha de Registro</div>,
    cell: ({ row }) => {
      const date = formatDate(new Date(row.getValue('createdAt')));

      return (
        <div className="text-sm">
          {date}
        </div>
      );
    }
  },
  {
    accessorKey: "name",
    header: () => (
      <div className='w-28'>Categoría</div>
    ),
    cell: ({ row }) => {
      return <div className='uppercase'>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: "codigoActividadSin",
    header: () => (
      <div className='w-28'>Actividad SIN</div>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('codigoActividadSin')}</div>
    }
  },

  {
    accessorKey: "codigoProductoSin",
    header: () => (
      <div className='w-28'>Producto SIN</div>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('codigoProductoSin')}</div>
    }
  },
  {
    accessorKey: "products",
    header: () => <div className="w-28">Productos</div>,
    cell: ({ row }) => {
      const products: [] = row.getValue('products') || [];
      const count = products.length

      return <div>{count}</div>;
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
      const categoryId = row.original._id
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

          <EditCategory
            open={open}
            setOpen={setOpen}
            categoryId={categoryId}
          />
        </>
      )
    },
  },
]