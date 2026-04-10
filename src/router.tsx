import { createBrowserRouter } from 'react-router';

import LoginView from './views/auth/LoginView';
import AppLayout from './layouts/AppLayout';
import DashboardView from './views/DashboardView';
import CategoriesView from './views/categories/CategoriesView';
import SuppliersView from './views/suppliers/SuppliersView';
import { ProductsView } from './views/products/ProductsView';
import CreateProductView from './views/products/CreateProductView';
import { NotFoundView } from './views/404/NotFoundView';
import EditProductView from './views/products/EditProductView';
import AddStockView from './views/products/AddStockView';
import ClientsView from './views/clients/ClientsView';
import SiatView from './views/siat/SiatView';
import PurchaseManagerView from './views/Movements/PurchaseManagerView';
import { CreatePurchaseView } from './views/Movements/CreatePurchaseView';
import EditPurchaseView from './views/Movements/EditPurchaseView';
import { AdjustmentsView } from './views/adjustments/AdjustmentsView';

const router = createBrowserRouter([
  {
    path: '/auth/login',
    Component: LoginView,
    index: true
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        path: 'home',
        Component: DashboardView,
        index: true
      },
      {
        path: 'categories',
        Component: CategoriesView,
      },
      {
        path: 'suppliers',
        Component: SuppliersView,
      },
      {
        path: 'products',
        children: [
          { index: true, Component: ProductsView },
          { path: 'new', Component: CreateProductView },
          { path: 'edit/:productId', Component: EditProductView },
          { path: 'add-stock/:productId', Component: AddStockView }
        ]
      },
      {
        path: 'clients',
        Component: ClientsView
      },
      {
        path: 'purchases',
        children: [
          { index: true, Component: PurchaseManagerView },
          { path: 'new', Component: CreatePurchaseView },
          { path: 'edit/:purchaseId', Component: EditPurchaseView }
        ]
      },
      {
        path: 'adjustments',
        children: [
          { index: true, Component: AdjustmentsView }
        ]
      },
      {
        path: 'config',
        children: [
          { path: 'siat', Component: SiatView },
        ]
      },
    ]
  },
  {
    path: '/404',
    Component: NotFoundView
  }
]);

export default router;