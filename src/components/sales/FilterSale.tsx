// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "../ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { formatDate } from "date-fns"
// import { CalendarIcon, ChevronDownIcon } from "lucide-react"
// import { useState, type Dispatch, type SetStateAction } from "react"
// import { es } from "date-fns/locale"
// import { Field, FieldContent, FieldLabel } from "../ui/field"
// import type { DateRange } from "react-day-picker"

// interface Props {
//   filters: {
//     fromDate: string;
//     toDate: string;
//   },
//   setFilters: Dispatch<SetStateAction<{
//     fromDate: string;
//     toDate: string;
//   }>>
// }

// export const FilterSale = ({ filters, setFilters }: Props) => {
//   const [openFromDate, setOpenFromDate] = useState(false)
//   const [openToDate, setOpenToDate] = useState(false)
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: undefined,
//     to: undefined,
//   })

//   const handleApply = () => {
//     setFilters({
//       fromDate: fromDate!.toISOString(),
//       toDate: toDate!.toISOString(),
//     });
//     setFromDate(undefined);
//     setToDate(undefined);
//   };

//   return (
//     <Field className="mx-auto w-60">
//       <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             id="date-picker-range"
//             className="justify-start px-2.5 font-normal"
//           >
//             <CalendarIcon />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {formatDate(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </Field>
//   )
// }
