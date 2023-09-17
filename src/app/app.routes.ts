import { Routes } from '@angular/router';

export const routes: Routes = ([] = [
   {
      path: 'customers',
      loadChildren: () => import('src/app/customers/customers.route').then((m) => m.customerRoutes),
   },
]);
