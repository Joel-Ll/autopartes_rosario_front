import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import type { ProductService } from '@/types/siat/siat'
import { useState } from 'react'

export function ProductServiceSelector({
  items,
  value,
  onChange,
}: {
  items: ProductService[]
  value?: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = items.find(
    (i) => `${i.codigoProducto}|${i.codigoActividad}` === value
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="w-full justify-between text-sm truncate py-4"
          title={
            selected
              ? `${selected.codigoProducto} - ${selected.descripcionProducto}`
              : "Seleccionar producto SIN"
          }
        >
          <span className="truncate">
            {selected
              ? `${selected.codigoProducto} - ${selected.descripcionProducto}`
              : "Seleccionar producto SIN"}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Buscar producto..." />
          <CommandEmpty>No encontrado</CommandEmpty>

          {/* className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4" */}
          {/* max-h-[500px] overflow-y-auto overscroll-contain */}
          <CommandList
            className="-mx-4 no-scrollbar max-h-[40vh] overflow-y-auto px-4"
            onWheel={(e) => e.stopPropagation()}
          >
            <CommandGroup>
              {items.map((item) => {
                const val = `${item.codigoProducto}|${item.codigoActividad}`
                return (
                  <CommandItem
                    key={val}
                    value={val}
                    keywords={[
                      item.codigoProducto.toString(),
                      item.descripcionProducto,
                      item.codigoActividad,
                    ]}
                    onSelect={() => {
                      onChange(val)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={
                        value === val
                          ? "mr-2 h-4 w-4 opacity-100"
                          : "mr-2 h-4 w-4 opacity-0"
                      }
                    />
                    <div>
                      <div className="text-sm">
                        {item.codigoProducto} — {item.descripcionProducto}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Actividad: {item.codigoActividad}
                      </div>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>

      {/* <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Buscar producto..." />
          <CommandEmpty>No encontrado</CommandEmpty>
          <CommandGroup>
            {items.map((item) => {
              const val = `${item.codigoProducto}|${item.codigoActividad}`
              return (
                <CommandItem
                  key={val}
                  value={val}
                  keywords={[
                    item.codigoProducto.toString(),
                    item.descripcionProducto,
                    item.codigoActividad,
                  ]}
                  onSelect={() => {
                    onChange(val)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={
                      value === val ? "mr-2 h-4 w-4 opacity-100" : "mr-2 h-4 w-4 opacity-0"
                    }
                  />
                  <div>
                    <div className="text-sm">
                      {item.codigoProducto} — {item.descripcionProducto}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Actividad: {item.codigoActividad}
                    </div>
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent> */}
    </Popover>
  )
}