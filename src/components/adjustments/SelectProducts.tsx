import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, type Dispatch, type SetStateAction } from 'react';

export interface SearchableSelectOption {
  value: string;
  label: string;
  stock: number;
}

interface Props {
  options: SearchableSelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  currentStock: number | undefined
  setCurrentStock: Dispatch<SetStateAction<number | undefined>>
}

export const SelectProducts = ({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  className,
  disabled,
  currentStock,
  setCurrentStock
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between font-normal",
                !value && "text-muted-foreground",
                className
              )}
              disabled={disabled}
            >
              <span className="truncate flex-1 text-left">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList className="max-h-60">
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <Tooltip key={option.value}>
                      <TooltipTrigger asChild>
                        <CommandItem
                          value={option.label}
                          onSelect={() => {
                            onValueChange?.(option.value === value ? "" : option.value);
                            setOpen(false);
                            setCurrentStock(option.stock)
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 shrink-0",
                              value === option.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span className="truncate">{option.label}</span>
                        </CommandItem>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="max-w-xs wrap-break-word"
                        sideOffset={5}
                      >
                        {option.label}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </TooltipProvider>

      {currentStock !== undefined && (
        <p className="text-xs text-muted-foreground">
          Stock actual: <span className="font-semibold">{currentStock}</span> unidades
        </p>
      )}
    </>
  )
}
