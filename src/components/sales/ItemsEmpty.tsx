import { Wrench } from "lucide-react";


export default function ItemsEmpty({children}: React.PropsWithChildren) {
  return (
    <div className="text-center text-muted-foreground py-3 border-2 border-dashed rounded-lg">
      <Wrench className="h-5 w-5 mx-auto mb-2 opacity-40" />
      <p className="text-xs">{children}</p>
    </div>
  )
}
