import { Route } from '@angular/router';
import { CustomerComponent } from './components/customer.component';
import { NewCustomerComponent } from './components/new-customers/new-customer.component';
import { EditCustomersComponent } from './components/edit-customers/edit-customers.component';
import { authorizationGuard } from '../auth/guards/authorization.guard';

export const customerRoutes: Route[] = [
   {
      path: '',
      component: CustomerComponent,
   },
   {
      path: 'add',
      canActivate: [authorizationGuard],
      data: { roles: 'ADMIN' },
      component: NewCustomerComponent,
   },
   {
      path: 'edit/:id',
      canActivate: [authorizationGuard],
      component: EditCustomersComponent,
   },
   {
      path: 'delete/:id',
      redirectTo: '',
   },
];
