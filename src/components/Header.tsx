import { Bell, Package, Search, User } from 'lucide-react'
import { SidebarTrigger } from './ui/sidebar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

interface Props {
  handleClose: () => void
}

export const Header = ({ handleClose }: Props) => {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-backdrop-filter:bg-header-background/60">
      <div className='container mx-auto px-4'>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Package className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-foreground">Taller Llanos</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-sky-700">{activeItem === null ? 'Inicio' : activeItem}</span>
            </div> */}
          </div>


          {/* Búsqueda y Acciones */}
          <div className="flex items-center gap-3">
            {/* TODO: Cambiar el buscador */}
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-64 pl-9 bg-secondary/50 border-border"
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-warning text-warning-foreground text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">Stock Bajo</Badge>
                    <span className="text-sm font-medium">Producto A</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Solo quedan 5 unidades</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs bg-accent">Stock OK</Badge>
                    <span className="text-sm font-medium">Producto B</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Reabastecimiento completado</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">Info</Badge>
                    <span className="text-sm font-medium">Nuevo reporte</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Reporte mensual disponible</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
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
