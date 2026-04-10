import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from "@tanstack/react-table"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, CheckCircle, Edit2, Eye, MoreHorizontal, TrendingDown, XCircle } from 'lucide-react'
import { formatDate } from '@/utils'

import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import type { Product } from '@/types/products/products.type'
import DeleteProduct from './DeleteProduct'
import DetailProduct from './DetailProduct'
import { updateStateProductAction } from '@/actions/products/update-state-product.action'
import { toast } from 'sonner'


export const columns: ColumnDef<Product>[] = [
  // {
  //   id: "isActive",
  //   accessorKey: "isActive",
  //   header: "Estado",
  //   cell: ({ row }) => {
  //     const isActive = row.original.isActive

  //     return (
  //       <div className="flex items-center gap-1 text-xs font-medium">
  //         <span
  //           className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-400"
  //             }`}
  //         />
  //         {isActive ? "Activo" : "Inactivo"}
  //       </div>
  //     )
  //   }
  // },
  {
    id: 'Código',
    accessorKey: "code",
    header: "Código"
  },
  {
    id: "Imagen",
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.original.image as string
      const getThumbnailUrl = (url: string) => {
        if (!url.includes('cloudinary')) return url;
        return url.replace('/upload/', '/upload/w_100,h_100,c_fill/');
      };

      return (
        <div className="flex justify-start">
          {imageUrl ? (
            <img
              src={getThumbnailUrl(imageUrl)}
              alt="Imagen del producto"
              className="h-12 w-12 object-cover rounded-md border"
              loading="lazy"
            />
          ) : (
            <div className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center border border-dashed">
              <span className='text-xs'>sin imagen</span>
            </div>
          )}
        </div>
      )
    }
  },
  {
    id: 'Descripción',
    accessorKey: "description",
    header: "Descripción"
  },
  {
    id: 'Categoría',
    accessorKey: "category.name",
    header: "Categoría",
    cell: ({ row }) => {
      return (
        <div className='uppercase'>{row.original.category?.name}</div>
      )
    }
  },
  {
    id: 'Marca',
    accessorKey: "brand",
    header: "Marca"
  },
  {
    id: 'Proveedor',
    accessorKey: "supplier.enterprise",
    header: "Proveedor",
    cell: ({ row }) => row.original.supplier?.enterprise
  },
  {
    id: 'Unidad de Medida',
    accessorKey: "unidadMedidaAbr",
    header: "Unidad"
  },
  {
    id: "currentStock",
    accessorKey: "currentStock",
    header: "Stock",
    cell: ({ row }) => {

      const { currentStock, minStock } = row.original

      let variant: "available" | "secondary" | "warning" | "destructive" = "available"
      let label = <CheckCircle />

      if (currentStock <= minStock) {
        variant = "destructive"
        label = <AlertTriangle />
      } else if (currentStock <= minStock * 2) {
        variant = "warning"
        label = <TrendingDown />
      }

      return (
        <div className="flex items-center gap-2">
          <Badge variant={variant}>
            {currentStock} / {minStock}
          </Badge>
          <span className="text-muted-foreground text-xs">
            {label}
          </span>
        </div>
      )
    }
  },
  {
    id: 'Precio',
    accessorKey: "purchasePrice",
    header: "Precio",
    cell: ({ row }) => `Bs ${row.original.purchasePrice}`
  },
  {
    id: 'Costo',
    accessorKey: "salePrice",
    header: "Costo",
    cell: ({ row }) => `Bs ${row.original.salePrice}`
  },
  {
    id: 'Fecha de Registro',
    accessorKey: "createdAt",
    header: "Fecha de Registro",
    cell: ({ row }) => {
      const date = formatDate(new Date(row.original.createdAt));
      return (
        <div className="text-sm">
          {date}
        </div>
      )
    }
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.original.isActive

      return (
        <Badge variant={'outline'} className={
          isActive
            ? "border-emerald-500 text-emerald-600 bg-emerald-50"
            : "border-red-500 text-red-600 bg-red-50"
        }>
          {isActive ? "Activo" : "Inactivo"}
        </Badge>
      )
    }
  },
  {
    id: "Acciones",
    cell: ({ row }) => {
      const product = row.original;
      const navigate = useNavigate();
      const productId = row.original._id
      const [openDelete, setOpenDelete] = useState(false);
      const [openView, setOpenView] = useState(false);
      const queryClient = useQueryClient();

      const { mutate } = useMutation({
        mutationFn: updateStateProductAction,
        onError: (error: TypeError) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products'] });
        }
      })

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

              <DropdownMenuItem onClick={() => mutate(productId)}>
                {row.original.isActive === true ? (
                  <>
                    <XCircle />
                    Inactivar
                  </>
                ) : (
                  <>
                    <CheckCircle />
                    Activar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/products/add-stock/${productId}`)} >
                <Eye />
                Ver detalles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteProduct
            productId={productId}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
          />

          <DetailProduct
            product={product}
            openView={openView}
            setOpenView={setOpenView}
          />
        </>
      )
    },
  },
]