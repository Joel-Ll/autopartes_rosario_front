import type { Sale } from "@/types/sales/sales.type";
import { formatDate } from "@/utils";

interface Props {
  sale: Sale
}

export const Ticket = ({ sale }: Props) => {

  return (
    <div className="w-[80mm] text-xs font-mono text-black">

      <div className="text-center mb-2">
        <p className="font-bold">TALLER LLANOS</p>
        <p>--------------------------------</p>
      </div>

      <p>Venta: {sale.code}</p>
      <p>Fecha: {formatDate(new Date(sale.createdAt))}</p>
      <p>Cliente: {sale.client.name}</p>

      <p>--------------------------------</p>

      {sale.items.map((item: any) => (
        <div key={item.productId}>
          <p>{item.description}</p>
          <div className="flex justify-between">
            <span>{item.quantity} x {item.unitPrice}</span>
            <span>Bs {item.subtotal}</span>
          </div>
        </div>
      ))}

      {sale.services?.map((s: any, i: number) => (
        <div key={i} className="flex justify-between">
          <span>{s.description}</span>
          <span>Bs {s.amount}</span>
        </div>
      ))}

      <p>--------------------------------</p>

      <div className="flex justify-between font-bold">
        <span>TOTAL</span>
        <span>Bs 320</span>
      </div>

      <p>--------------------------------</p>

      {sale.transactions.map((p: any, i: number) => (
        <div key={i} className="flex justify-between">
          <span>{p.method}</span>
          <span>Bs {p.amount}</span>
        </div>
      ))}

      <p className="text-center mt-2">Gracias por su compra</p>
    </div>
  );
};