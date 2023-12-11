import { Route } from '@angular/router';
import { CustomerComponent } from './components/customer.component';
import { NewCustomerComponent } from './components/new-customers/new-customer.component';
import { EditCustomersComponent } from './components/edit-customers/edit-customers.component';
import { authorizationGuard } from '../auth/guards/authorization.guard';

export const customerRoutes: Route[] = [
   {
      path: '',
      data: { roles: 'ADMIN' },
      component: CustomerComponent,
   },
   {
      path: 'add',
      data: { roles: 'ADMIN' },
      component: NewCustomerComponent,
   },
   {
      path: 'edit/:id',
      data: { roles: 'ADMIN' },
      component: EditCustomersComponent,
   },
   {
      path: 'delete/:id',
      redirectTo: '',
   },
];
