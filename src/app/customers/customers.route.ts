import { Route } from '@angular/router';
import { CustomerComponent } from './components/customer.component';
import { NewCustomerComponent } from './components/new-customers/new-customer.component';

export const customerRoutes: Route[] = [
   {
      path: '',
      component: CustomerComponent,
   },
   {
      path: 'add',
      component: NewCustomerComponent,
   },
   {
      path: 'delete/:id',
      redirectTo: '',
   },
];
