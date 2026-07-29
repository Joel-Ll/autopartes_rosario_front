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
  type SortingState,
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
import { Input } from "@/components/ui/input"
import { Spinner } from '@/components/ui/spinner'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  isLoading: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentState, setCurrentState] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    autoResetPageIndex: true,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className="flex flex-1 gap-5 flex-wrap items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="source"
                type="search"
                placeholder="Buscar por nombre o contácto"
                value={(table.getState().globalFilter as string) ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                className="pl-9 bg-secondary/50"
              />
            </div>

            <Select
              value={currentState}
              onValueChange={(value) => {
                setCurrentState(value);
                if (value === 'all') {
                  table.getColumn('state')?.setFilterValue(undefined);
                  return;
                } else {
                  const booleanValue = value === 'true';
                  table.getColumn('state')?.setFilterValue(booleanValue);
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

          <Button className='gap-2 w-full md:w-fit' onClick={() => navigate('/clients/new')}>
            <Plus className="h-5 w-5" />
            Nuevo Cliente
          </Button>
        </div>

        <div className="overflow-hidden rounded-md border bg-white shadow-sm mt-5">
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