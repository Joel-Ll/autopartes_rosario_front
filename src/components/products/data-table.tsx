import { useState } from 'react'
import { useNavigate } from 'react-router'

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type FilterFn,
} from "@tanstack/react-table"
import { useTablePersistence } from '@/hooks/useTable'

import { Filter, Plus, Search } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import type { Product } from '@/types/products/products.type'
import { useSelectCategory } from '@/hooks/useCategory'

interface DataTableProps<TData extends Product, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[];
  isLoading: boolean;
}

const customFilter: FilterFn<any> = (row, _, filterValue) => {
  const searchTerm = filterValue?.toLowerCase().trim() || "";
  if (!searchTerm) return true;

  const internalcode = row.original.internalCode?.toLowerCase().trim() || "";
  const catalogCode = row.original.catalogCode?.toLowerCase().trim() || "";
  const description = row.original.description?.toLowerCase() || "";
  const brand = row.original.brand?.toLowerCase() || "";
  const category = row.original.category?.name?.toLowerCase() || "";
  const supplier = row.original.supplier?.enterprise?.toLowerCase() || "";

  return internalcode.includes(searchTerm) ||
    catalogCode.includes(searchTerm) ||
    description.includes(searchTerm) ||
    brand.includes(searchTerm) ||
    category.includes(searchTerm) ||
    supplier.includes(searchTerm);
};

export function DataTable<TData extends Product, TValue>({
  columns,
  data,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, onColumnVisibilityChange] = useTablePersistence('products');
  const [currentState, setCurrentState] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { data: categoriesSelect = [] } = useSelectCategory();
  const navigate = useNavigate();

  const handleCategoryFilter = (categoryId: string) => {
    setCategoryFilter(categoryId);
    if (categoryId === 'all') {
      table.getColumn('category')?.setFilterValue(undefined);
      return
    } else {
      table.getColumn('category')?.setFilterValue(categoryId);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange,
    globalFilterFn: customFilter,
    state: {
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    autoResetPageIndex: true,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
            <div className="flex flex-1 gap-5 flex-wrap items-center">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="source"
                  type="search"
                  placeholder="Buscar por código, descripción..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-9 bg-secondary/50"
                />
              </div>

              <Select
                value={categoryFilter}
                onValueChange={(value) => handleCategoryFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-56">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {categoriesSelect.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={currentState}
                onValueChange={(value) => {
                  setCurrentState(value);
                  if (value === 'all') {
                    table.getColumn('isActive')?.setFilterValue(undefined);
                    return;
                  } else {
                    const booleanValue = value === 'true';
                    table.getColumn('isActive')?.setFilterValue(booleanValue);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-56">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="true">Activo</SelectItem>
                  <SelectItem value="false">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className='gap-2 w-full md:w-fit' onClick={() => navigate('/products/new')}>
              <Plus className="h-5 w-5" />
              Nuevo Producto
            </Button>
          </div>

          <div className="overflow-hidden rounded-md border bg-white shadow-sm mt-5">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading
                  ? (
                    <TableRow>
                      <TableCell colSpan={12} className="h-24 text-center">
                        <div className="flex justify-center items-center">
                          <Spinner className="h-8 w-8" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            No hay registros
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                }
              </TableBody>
            </Table>
          </div>

          <div className='flex gap-5 justify-between items-center mt-5'>
            <Select
              onValueChange={(value) => {
                table.setPageSize(+value)
              }}
            >
              <SelectTrigger className='w-[180px] '>
                <SelectValue placeholder="5 filas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filas por pagina</SelectLabel>
                  <SelectItem value='5'>5</SelectItem>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                  <SelectItem value='30'>30</SelectItem>
                  <SelectItem value='40'>40</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-end space-x-2 ">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>




    </>
  )
}