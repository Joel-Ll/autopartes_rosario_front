import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

import type { Product } from "@/types/products/products.type";
import {
  Hash, ScanLine, Tag, Heart, Truck, Ruler,
  MapPin, Calendar, Package, Coins, Layers,
  AlertTriangle, DollarSign, Info,
  ImageIcon,
  Package2,
  ArrowLeft,
  Percent,
} from "lucide-react";

interface Props {
  data: Product;
}

const InfoRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-2 py-2 border-b last:border-none text-sm">
    <span className="flex items-center gap-1.5 text-muted-foreground min-w-[180px] shrink-0">
      {icon}
      {label}
    </span>
    <span>{children}</span>
  </div>
);

const MetricCard = ({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="bg-muted/50 rounded-lg p-3">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className={`text-xl font-bold ${valueClass ?? ""}`}>{value}</p>
  </div>
);


export const ProductDetail = ({ data }: Props) => {

  const navigate = useNavigate();
  const profit = data.salePrice - data.purchasePrice;
  const margin = data.salePrice > 0
    ? ((profit / data.purchasePrice) * 100).toFixed(0)
    : "0";
  const inventoryValue = data.currentStock * data.purchasePrice;
  const stockOk = data.currentStock > data.minStock;

  return (
    <div className="space-y-4 w-full lg:w-4/5 mx-auto my-auto" data-aos="fade-in" data-aos-duration="300">

      <Button variant="link" size="sm" onClick={() => navigate(-1)} className="mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos
      </Button>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <Card className="mb-5 overflow-hidden py-0">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[180px_1fr_220px]">

            {/* Imagen */}
            <div className="mx-auto lg:mx-0">
              <div className="h-44 w-44 overflow-hidden rounded-xl sm:h-48 sm:w-48">
                {data?.image ? (
                  <img
                    src={data.image}
                    alt={data.description}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            </div>

            {/* Información */}
            <div className="flex flex-col justify-center">

              <div className="mb-3">
                <Badge
                  className={
                    data.isActive
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                  }
                >
                  {data.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <h1 className="text-center text-2xl font-bold leading-tight sm:text-3xl lg:text-left lg:text-4xl">
                {data.description}
              </h1>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">

                <Badge variant="secondary">
                  #{data.internalCode}
                </Badge>

                <Badge variant="outline">
                  {data.catalogCode || "S/N"}
                </Badge>

                <Badge variant="outline">
                  {data.brand}
                </Badge>

              </div>
            </div>

            {/* Stock */}
            <Card className="border shadow-none">
              <CardContent className="flex h-full flex-col justify-between p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Stock actual
                    </p>

                    <div className="mt-2 flex items-end gap-2">
                      <span
                        className={`text-5xl font-bold ${data.currentStock <= data.minStock
                          ? "text-red-500"
                          : "text-green-600"
                          }`}
                      >
                        {data.currentStock}
                      </span>

                      <span className="pb-1 text-muted-foreground">
                        und
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3 dark:bg-green-950">
                    <Package2 className="h-8 w-8 text-green-600" />
                  </div>

                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Stock mínimo
                  </span>

                  <span className="font-semibold text-amber-600">
                    {data.minStock} und
                  </span>
                </div>

              </CardContent>
            </Card>

          </div>
        </CardContent>
      </Card>

      {/* ── Cuerpo ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Información general */}
        <Card>
          <CardContent className="p-5">

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b mb-3">
              <Info className="w-3.5 h-3.5" /> Información general
            </p>

            <InfoRow icon={<Hash className="w-3.5 h-3.5" />} label="Cód. interno">
              {data.internalCode}
            </InfoRow>

            {data.catalogCode && (
              <InfoRow icon={<ScanLine className="w-3.5 h-3.5" />} label="Cód. fabricante">
                {data.catalogCode}
              </InfoRow>
            )}

            <InfoRow icon={<Tag className="w-3.5 h-3.5" />} label="Categoría">
              <Badge variant="secondary" className="text-xs font-normal">
                {data.category.name}
              </Badge>
            </InfoRow>

            <InfoRow icon={<Heart className="w-3.5 h-3.5" />} label="Marca">
              <Badge variant="secondary" className="text-xs font-normal">
                {data.brand}
              </Badge>
            </InfoRow>

            <InfoRow icon={<Truck className="w-3.5 h-3.5" />} label="Proveedor">
              {data.supplier.enterprise}
            </InfoRow>

            <InfoRow icon={<Ruler className="w-3.5 h-3.5" />} label="Unidad de medida">
              {data.unidadMedida}
            </InfoRow>

            {data.location && (
              <InfoRow icon={<MapPin className="w-3.5 h-3.5" />} label="Ubicación">
                {data.location}
              </InfoRow>
            )}

            <InfoRow icon={<Percent className="w-3.5 h-3.5" />} label="Ref. Descuento">
              Bs. {data.discountReference} 
            </InfoRow>

            <InfoRow icon={<Calendar className="w-3.5 h-3.5" />} label="Fecha de creación">
              <span className="text-muted-foreground">
                {new Date(data.createdAt).toLocaleString("es-BO")}
              </span>
            </InfoRow>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">

          {/* Precios */}
          <Card className="shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b mb-3">
                <Coins className="w-4 h-4" /> Precios
              </p>
              <div className="grid grid-cols-2 gap-2">
                <MetricCard
                  label="Último costo"
                  value={`Bs. ${data.purchasePrice.toLocaleString()}`}
                />
                <MetricCard
                  label="Precio de venta"
                  value={`Bs. ${data.salePrice.toLocaleString()}`}
                />
                <MetricCard
                  label="Ganancia"
                  value={`Bs. ${profit.toLocaleString()}`}
                  valueClass={profit > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}
                />
                <MetricCard
                  label="Margen"
                  value={`${margin}%`}
                  valueClass={profit > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventario */}
          <Card className="shadow-none">
            <CardContent className="p-5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b mb-3">
                <Layers className="w-3.5 h-3.5" /> Inventario
              </p>

              <InfoRow icon={<Package className="w-3.5 h-3.5" />} label="Stock actual">
                <span className={`font-medium ${stockOk ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                  {data.currentStock} unidades
                </span>
              </InfoRow>

              <InfoRow icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Stock mínimo">
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  {data.minStock} unidades
                </span>
              </InfoRow>

              <InfoRow icon={<DollarSign className="w-3.5 h-3.5" />} label="Valor inventario">
                <span className="font-medium">
                  Bs. {inventoryValue.toLocaleString()}
                </span>
              </InfoRow>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};