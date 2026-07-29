import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getCurrentPage } from '@/utils'
import { useSidebarStore } from '@/store/sidebar.store'
import { User } from 'lucide-react'

interface Props {
  handleClose: () => void
}

export const Header = ({ handleClose }: Props) => {
  const { handleItemClick } = useSidebarStore();
  const navigate = useNavigate();
  const { data } = useAuth();
  const location = useLocation();
  const currentPage = getCurrentPage(location.pathname);
  const Icon = currentPage?.icon;
  const handleNavigate = () => {
    handleItemClick('Perfil');
    navigate('/config/profile');

  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-backdrop-filter:bg-header-background/60">
      <div className='container mx-auto px-4'>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />

            <div className="flex items-center gap-3">
              {Icon && (
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              )}

              <div>
                <h1 className="text-2xl font-bold">
                  {currentPage?.title}
                </h1>
              </div>
            </div>
          </div>


          {/* Búsqueda y Acciones */}
          <div className="flex items-center gap-3">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{data?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleNavigate}
                >Perfil</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleClose}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </header>
  )
}
