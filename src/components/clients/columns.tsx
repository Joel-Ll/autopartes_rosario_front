import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from "@tanstack/react-table"
import { Edit2, MoreHorizontal, Plus, Trash2 } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import type { Client } from '@/types/clients/clients.type'


export const columns: ColumnDef<Client>[] = [
  {
    id: 'razonSocial',
    accessorKey: 'razonSocial',
    header: 'Nombre / Razón Social'
  },
  {
    id: 'nit-ci',
    accessorKey: "documentoId",
    header: "NIT/CI"
  },
  {
    id: 'complemento',
    accessorKey: "complementoId",
    header: "Complemento",
    cell: ({ row }) => {
      
    }
  },
  {
    id: "Acciones",
    header: () => <div className="w-28">Acciones</div>,
    cell: ({ row }) => {
      const product = row.original;
      const navigate = useNavigate();
      const productId = row.original._id
      const [openDelete, setOpenDelete] = useState(false);
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
              <DropdownMenuItem onClick={() => navigate(`/products/edit/${productId}`)} >
                <Edit2 />
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                <Trash2 />
                Eliminar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/products/add-stock/${productId}`)} >
                <Plus />
                Agregar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]