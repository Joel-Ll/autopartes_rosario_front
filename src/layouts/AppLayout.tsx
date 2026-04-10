import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

import { AppSidebar } from '@/components/AppSidebar';
import {
  SidebarInset,
  SidebarProvider
} from '@/components/ui/sidebar';
import { Header } from '@/components/Header';


export default function AppLayout() {
  const navigate = useNavigate();
  const handleClose = () => {
    localStorage.removeItem('AUTH_TOKEN')
    // TODO: Invalidar la obtencion del usuario
    // queryClient.invalidateQueries({queryKey: ['']});
    navigate('/auth/login');
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className='bg-background'>
          <Header
            handleClose={handleClose}
          />

          <main className="container mx-auto px-4 py-8 space-y-8">
            <Outlet />
          </main>

          <footer>
            <p className="text-xs text-muted-foreground px-2 text-center pb-5">
              Copyright &copy; {new Date().getFullYear()} Desarrollado por Ing. Joel Llanos - Cel. 725 49 764
            </p>
          </footer>
        </SidebarInset>

      </div>

    </SidebarProvider>
  )
}
