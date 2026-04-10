// import { useState } from 'react'
// import { useNavigate } from 'react-router'
// import type { ColumnDef } from "@tanstack/react-table"
// import { AlertCircle, CheckCircle, Clock, Edit2, Eye, EyeIcon, MoreHorizontal, Plus, RefreshCw, Trash2, XCircle } from 'lucide-react'
// import { formatDate } from '@/utils'

// import { Badge } from '@/components/ui/badge'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
// import { Button } from '../ui/button'
// import DeleteProduct from '../products/DeleteProduct'
// import DetailProduct from '../products/DetailProduct'
// import type { CatalogoSiat } from '@/types/siat/siat'
// import type { CatalogoItem } from '@/views/siat/SiatView'
// import { Spinner } from '../ui/spinner'
// import { useMutation } from '@tanstack/react-query'

// const obtenerListas = async () => {
//   await console.log('obteniendo');
// }

// const getEstadoBadge = (estado: CatalogoItem['estado']) => {
//   const config = {
//     sincronizado: {
//       variant: 'default' as const,
//       icon: <CheckCircle className="h-3 w-3 mr-1" />,
//       text: 'Sincronizado'
//     },
//     desactualizado: {
//       variant: 'secondary' as const,
//       icon: <Clock className="h-3 w-3 mr-1" />,
//       text: 'Desactualizado'
//     },
//     no_sincronizado: {
//       variant: 'outline' as const,
//       icon: <AlertCircle className="h-3 w-3 mr-1" />,
//       text: 'No sincronizado'
//     },
//     sincronizando: {
//       variant: 'default' as const,
//       icon: <RefreshCw className="h-3 w-3 mr-1 animate-spin" />,
//       text: 'Sincronizando'
//     },
//     error: {
//       variant: 'destructive' as const,
//       icon: <XCircle className="h-3 w-3 mr-1" />,
//       text: 'Error'
//     },
//   };

//   const { variant, icon, text } = config[estado];

//   return (
//     <Badge variant={variant} className="flex items-center w-fit">
//       {icon}
//       {text}
//     </Badge>
//   );
// };

// const loading = true;

// export const columns: ColumnDef<CatalogoSiat>[] = [
//   {
//     accessorKey: "name",
//     header: "Catálogo",
//     cell: ({ row }) => (
//       <div className="font-medium">
//         <span className="font-semibold">{row.original.name}</span>
//       </div>
//     )
//   },
//   {
//     accessorKey: "description",
//     header: "Descripción",
//     cell: ({ row }) => (
//       <div className="max-w-[300px] truncate">
//         {row.original.description}
//       </div>
//     )
//   },
//   {
//     accessorKey: "lastSyncAt",
//     header: "Última Sincronización",
//     cell: ({ row }) => (
//       <div className="max-w-[300px] truncate">
//         {row.original.lastSyncAt ? row.original.lastSyncAt : 's/n'}
//       </div>
//     )
//   },
//   {
//     accessorKey: "registers",
//     header: "Registros",
//     cell: ({ row }) => (
//       <Badge variant="outline">
//         {row.original.totalRegisters} reg.
//       </Badge>
//     )
//   },
//   {
//     accessorKey: "state",
//     header: "Estado",
//     cell: ({ row }) => {
//       const status: CatalogoItem['estado'] = row.original.state;
//       const state = getEstadoBadge(status)
//       return state
//     }
//   },
//   {
//     id: "Acciones",
//     header: () => <div className='flex justify-end'>Acciones</div>,
//     cell: ({ row }) => {

//       const { mutate, isPending } = useMutation({
//         mutationFn: obtenerListas,
//         onSuccess: () => {

//         },
//         onError: () => {

//         }
//       });


//       return (
//         <>
//           <div className="flex justify-end gap-2">
//             {/* <Button
//               size="sm"
//               variant="outline"
//               onClick={() => {
//                 // setSelectedCatalogo(catalogo);
//                 // setIsModalOpen(true);
//               }}
//             >
//               <Eye className="h-4 w-4" />
//             </Button> */}
//             <Button
//               size="sm"
//               variant="default"
//               onClick={() => mutate()}
//             >
//               {row.original.state === 'sincronizando' ? (
//                 <Spinner className="h-4 w-4" />
//               ) : (
//                 <RefreshCw className="h-4 w-4" />
//               )}
//             </Button>
//           </div>
//         </>
//       )
//     },
//   },

//   // {
//   //   id: "Imagen",
//   //   accessorKey: "image",
//   //   header: "Imagen",
//   //   cell: ({ row }) => {
//   //     const imageUrl = row.original.image as string
//   //     const getThumbnailUrl = (url: string) => {
//   //       if (!url.includes('cloudinary')) return url;
//   //       return url.replace('/upload/', '/upload/w_100,h_100,c_fill/');
//   //     };

//   //     return (
//   //       <div className="flex justify-start">
//   //         {imageUrl ? (
//   //           <img
//   //             src={getThumbnailUrl(imageUrl)}
//   //             alt="Imagen del producto"
//   //             className="h-12 w-12 object-cover rounded-md border"
//   //             loading="lazy"
//   //           />
//   //         ) : (
//   //           <div className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center border border-dashed">
//   //             <span className='text-xs'>sin imagen</span>
//   //           </div>
//   //         )}
//   //       </div>
//   //     )
//   //   }
//   // },
//   // {
//   //   id: 'Descripción',
//   //   accessorKey: "description",
//   //   header: "Descripción"
//   // },
//   // {
//   //   id: 'Categoría',
//   //   accessorKey: "category.name",
//   //   header: "Categoría",
//   //   cell: ({ row }) => {
//   //     return (
//   //       <div className='uppercase'>{row.original.category?.name}</div>
//   //     )
//   //   }
//   // },
//   // {
//   //   id: 'Marca',
//   //   accessorKey: "brand",
//   //   header: "Marca"
//   // },
//   // {
//   //   id: 'Proveedor',
//   //   accessorKey: "supplier.enterprise",
//   //   header: "Proveedor",
//   //   cell: ({ row }) => row.original.supplier?.enterprise
//   // },
//   // {
//   //   id: 'Unidad de Medida',
//   //   accessorKey: "unit",
//   //   header: "Unidad"
//   // },
//   // {
//   //   id: "stock",
//   //   accessorKey: "stock",
//   //   header: "Stock",
//   //   cell: ({ row }) => {
//   //     const value = row.getValue("stock") as number

//   //     let variant: "default" | "secondary" | "destructive" = "default"

//   //     if (value <= 0) {
//   //       variant = "destructive"
//   //     } else if (value <= 5) {
//   //       variant = "secondary"
//   //     }

//   //     return (
//   //       <Badge variant={variant}>
//   //         {value}
//   //       </Badge>
//   //     )
//   //   }
//   // },
//   // {
//   //   id: 'Precio Venta',
//   //   accessorKey: "salePrice",
//   //   header: "Precio Venta",
//   //   cell: ({ row }) => `Bs ${row.original.salePrice}`
//   // },
//   // {
//   //   id: 'Precio de Compra',
//   //   accessorKey: "purchasePrice",
//   //   header: "Precio Compra",
//   //   cell: ({ row }) => `Bs ${row.original.purchasePrice}`
//   // },
//   // {
//   //   id: 'Margen de Venta',
//   //   accessorKey: "sellingMargin",
//   //   header: "Margen de Venta",
//   //   cell: ({ row }) => `${row.original.sellingMargin}%`
//   // },
//   // {
//   //   id: 'Fecha de Registro',
//   //   accessorKey: "createdAt",
//   //   header: "Fecha de Registro",
//   //   cell: ({ row }) => {
//   //     const date = formatDate(new Date(row.original.createdAt));
//   //     return (
//   //       <div className="text-sm">
//   //         {date}
//   //       </div>
//   //     )
//   //   }
//   // },
//   // {
//   //   id: "Acciones",
//   //   header: () => <div className="w-28">Acciones</div>,
//   //   cell: ({ row }) => {
//   //     const product = row.original;
//   //     const navigate = useNavigate();
//   //     const productId = row.original._id
//   //     const [openDelete, setOpenDelete] = useState(false);
//   //     const [openView, setOpenView] = useState(false);

//   //     return (
//   //       <>
//   //         <DropdownMenu>
//   //           <DropdownMenuTrigger asChild>
//   //             <Button variant="ghost" className="h-8 w-8 p-0">
//   //               <span className="sr-only">Open menu</span>
//   //               <MoreHorizontal className="h-4 w-4" />
//   //             </Button>
//   //           </DropdownMenuTrigger>
//   //           <DropdownMenuContent align="end">
//   //             <DropdownMenuItem onClick={() => {
//   //               setOpenView(true)
//   //             }} >
//   //               <EyeIcon />
//   //               Ver
//   //             </DropdownMenuItem>
//   //             <DropdownMenuItem onClick={() => navigate(`/products/edit/${productId}`)} >
//   //               <Edit2 />
//   //               Editar
//   //             </DropdownMenuItem>

//   //             <DropdownMenuItem onClick={() => setOpenDelete(true)}>
//   //               <Trash2 />
//   //               Eliminar
//   //             </DropdownMenuItem>
//   //             <DropdownMenuSeparator />
//   //             <DropdownMenuItem onClick={() => navigate(`/products/add-stock/${productId}`)} >
//   //               <Plus />
//   //               Agregar
//   //             </DropdownMenuItem>
//   //           </DropdownMenuContent>
//   //         </DropdownMenu>

//   //         <DeleteProduct
//   //           productId={productId}
//   //           openDelete={openDelete}
//   //           setOpenDelete={setOpenDelete}
//   //         />

//   //         <DetailProduct
//   //           product={product}
//   //           openView={openView}
//   //           setOpenView={setOpenView}
//   //         />
//   //       </>
//   //     )
//   //   },
//   // },
// ]