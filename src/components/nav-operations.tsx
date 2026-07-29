import { Link } from "react-router"
import { useSidebarStore } from "@/store/sidebar.store"
import type { LucideIcon } from "lucide-react"
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"


type TNavOperations = {
  title: string,
  url: string,
  icon: LucideIcon
}[]

interface Props {
  operations: TNavOperations,
  isCollapsed: boolean
}

export default function NavOperations({ operations, isCollapsed }: Props) {
  const { handleItemClick, activeItem } = useSidebarStore();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>GESTIÓN</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {operations.map(item => (
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
