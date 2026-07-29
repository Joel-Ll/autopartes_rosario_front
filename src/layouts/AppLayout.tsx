import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import { AppSidebar } from '@/components/AppSidebar';
import {
  SidebarInset,
  SidebarProvider
} from '@/components/ui/sidebar';
import { Header } from '@/components/Header';


export default function AppLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleClose = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.removeQueries({ queryKey: ['userAuth'] });
    navigate('/auth/login', { replace: true });
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className='bg-background'>
          <Header
            handleClose={handleClose}
          />

          <main className="container mx-auto px-4 py-8 space-y-4">
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
