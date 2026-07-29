import { Folders, Home, Package, Settings2, ShoppingCart, Store, Truck, UserRoundCog, Users, Wallet } from "lucide-react";

export const routeMetadata = [
  {
    startsWith: "/home",
    title: "Inicio",
    icon: Home,
  },
  {
    startsWith: "/categories",
    title: "Categorías",
    icon: Folders,
  },
  {
    startsWith: "/suppliers",
    title: "Proveedores",
    icon: Truck
  },
  {
    startsWith: "/products",
    title: "Productos",
    icon: Package,
  },
  {
    startsWith: "/clients",
    title: "Clientes",
    icon: Users,
  },
  {
    startsWith: "/purchases",
    title: "Compras",
    icon: Store, 
  },
  { 
    startsWith: "/adjustments",
    title: "Ajustes de Stock",
    icon: Settings2, 
  },
  {
    startsWith: "/sales",
    title: "Ventas",
    icon: ShoppingCart,
  },
  {
    startsWith: "/cash-register",
    title: "Caja",
    icon: Wallet,
  },
  {
    startsWith: "/config",
    title: "Perfil",
    icon: UserRoundCog,
  },
];