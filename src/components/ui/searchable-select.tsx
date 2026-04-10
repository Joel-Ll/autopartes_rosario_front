import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from './badge';
import type { ProductCatalog } from '@/types/purchases/purchases-type';

interface Props {
  label: string;
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  catalogProducts: {
    _id: string;
    code: string;
    description: string;
    brand: string;
    purchasePrice: number;
    salePrice: number;
  }[] | undefined;
  handleAddProduct: (product: ProductCatalog) => void
}


export const SearchableSelect = ({ label, searchOpen, setSearchOpen, catalogProducts, handleAddProduct }: Props) => {
  return (
    <Popover open={searchOpen} onOpenChange={setSearchOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="gap-2">
          <Plus className="h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      {catalogProducts && (
        <PopoverContent className="w-96 p-0" align="end">
          <Command>
            <CommandInput placeholder="Buscar producto por nombre o código..." />
            <CommandList className="max-h-64">
              <CommandEmpty>No se encontraron productos.</CommandEmpty>
              <CommandGroup heading="Productos disponibles">
                {catalogProducts.map((product) => (
                  <CommandItem
                    key={product._id}
                    value={`${product.code} ${product.description}`}
                    onSelect={() => handleAddProduct(product)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {product.code}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {product.brand}
                        </Badge>
                      </div>
                      <span className="text-sm truncate">{product.description}</span>
                    </div>
                    <Plus className="h-4 w-4 shrink-0 text-primary" />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  )
}
