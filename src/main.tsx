import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import AOS from 'aos';
import 'aos/dist/aos.css';


import './index.css'
import router from './router'
AOS.init();

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        position="top-center"
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
