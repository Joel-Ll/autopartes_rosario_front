import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import type { INavData } from '@/types/sidebar-menu/sidebar-menu.types'
import { useSidebarStore } from '@/store/sidebar.store';


interface Props {
  items: INavData,
  isCollapsed: boolean
}

export function NavMain({ items, isCollapsed }: Props) {
  const { handleItemClick, activeItem } = useSidebarStore();

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.navMain.map(item => (
              item.items ?
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={activeItem === item.title}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={activeItem === subItem.title}
                              onClick={() => handleItemClick(subItem.title)}
                            >
                              <Link
                                to={subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
                :
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
    </>
  )
}
