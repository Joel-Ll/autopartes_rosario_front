import { useState } from 'react'
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
import { Filter, Search } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CategoryProduct } from '@/types/categories/categories.types'

interface DataTableProps<TData extends CategoryProduct, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[];
  onRowDoubleClick?: (product: TData) => void;
}

const customFilter: FilterFn<any> = (row, _, filterValue) => {
  const searchTerm = filterValue?.toLowerCase().trim() || "";
  if (!searchTerm) return true;

  const internalcode = row.original.internalCode?.toLowerCase().trim() || "";
  const catalogCode = row.original.catalogCode?.toLowerCase().trim() || "";
  const description = row.original.description?.toLowerCase().trim() || "";

  return internalcode.includes(searchTerm) ||
    catalogCode.includes(searchTerm) ||
    description.includes(searchTerm);
};

export function DataTable<TData extends CategoryProduct, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentStatus, setCurrentStatus] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: customFilter,
    state: {
      columnFilters,
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
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">Productos de la categoría</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {/* find filtrado */}
              <div className="flex items-center relative">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="source"
                  type="search"
                  placeholder="Buscar por código o descripción"
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="w-full lg:w-[400px] pl-9 bg-secondary/50 border-border text-sm"
                />
              </div>

              {/* select filter */}
              <Select
                value={currentStatus}
                onValueChange={(value) => {
                  setCurrentStatus(value);
                  if (value === 'all') {
                    table.getColumn('currentStock')?.setFilterValue(undefined);
                    return;
                  } else {
                    table.getColumn('currentStock')?.setFilterValue(value);
                  }
                }}
              >
                <SelectTrigger className="w-full sm:w-56">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ok">Normal</SelectItem>
                  <SelectItem value="low">Bajo stock</SelectItem>
                  <SelectItem value="out">Sin stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='text-muted-foreground'>
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
            </TableBody>
          </Table>

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