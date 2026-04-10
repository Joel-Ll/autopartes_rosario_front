import {
  ArrowRightLeft,
  Home,
  Package,
  Users,
  Wrench,
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import {
  Sidebar,
  SidebarContent, SidebarRail,
  useSidebar
} from "@/components/ui/sidebar";
import type { INavData } from '@/types/sidebar-menu/sidebar-menu.types';

const data: INavData = {
  navMain: [
    {
      title: 'Inicio',
      url: '/home',
      icon: Home,
    },
    {
      title: "Inventario",
      icon: Package,
      items: [
        {
          title: "Categorías",
          url: "/categories",
        },
        {
          title: "Productos",
          url: "/products",
        },
        {
          title: "Proveedores",
          url: "/suppliers",
        },
      ]
    },

    {
      title: "Clientes",
      url: "/clients",
      icon: Users,
    },
    {
      title: "Movimientos",
      icon: ArrowRightLeft,
      items: [
        {
          title: "Compras",
          url: "/purchases",
        },
        {
          title: "Ventas",
          url: "/movements/sales",
        },
        {
          title: "Ajustes",
          url: "/adjustments",
        },
      ]
    },
    {
      title: "Configuración",
      icon: Wrench,
      items: [
        {
          title: "Siat",
          url: "/config/siat",
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        <NavMain
          items={data}
          isCollapsed={isCollapsed}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
