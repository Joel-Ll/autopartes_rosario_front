import { Link } from "react-router"
import { useSidebarStore } from "@/store/sidebar.store"
import type { LucideIcon } from "lucide-react"
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"


type TNavSale = {
  title: string,
  url: string,
  icon: LucideIcon
}[]

interface Props {
  sales: TNavSale,
  isCollapsed: boolean
}

export default function NavSales({ sales, isCollapsed }: Props) {
  const { handleItemClick, activeItem } = useSidebarStore();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>VENTAS</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {sales.map(item => (
            <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}
              isActive={activeItem === item.title}
              onClick={() => handleItemClick(item.title)}
            >
              {item.url && (
                <Link
                  to={item.url && item.url}
                >
                  <item.icon />
                  {!isCollapsed && <span className=''>{item.title}</span>}
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
