import { useState } from 'react'
import { useNavigate } from 'react-router'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

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
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { SupplierDataStats  } from '@/types/suppliers/suppliers.type'

interface DataTableProps<TData extends SupplierDataStats, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

const customFilter: FilterFn<any> = (row, _, filterValue) => {
  const searchTerm = filterValue?.toLowerCase().trim() || "";
  if (!searchTerm) return true;

  const code = row.original.enterprise?.toLowerCase() || "";
  const promotor = row.original.contact?.name?.toLowerCase() || "";
  const phone = row.original.contact?.phone?.toLowerCase() || "";

  return code.includes(searchTerm) ||
    promotor.includes(searchTerm) ||
    phone.includes(searchTerm)
};

export function DataTable<TData extends SupplierDataStats, TValue>({
  columns,
  data,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentState, setCurrentState] = useState('');
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();

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
      globalFilter
    },
    autoResetPageIndex: true,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between mb-5">
          <div className="flex flex-1 gap-3 flex-wrap items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="source"
                type="search"
                placeholder="Buscar ..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-9 bg-secondary/50"
              />
            </div>

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

          <Button className='gap-2 w-full md:w-auto' onClick={() => navigate('new')}>
            <Plus className="h-4 w-4" />
            Nuevo Proveedor
          </Button>
        </div>

        <div className="overflow-hidden rounded-md border bg-white shadow-sm">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='px-5 py-4'>
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
                    <TableCell colSpan={6} className="h-24 text-center px-5">
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
                            <TableCell key={cell.id} className='px-5 py-4'>
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
  )
}