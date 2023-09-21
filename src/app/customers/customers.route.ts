import { Route } from '@angular/router';
import { CustomerComponent } from './components/customer.component';
import { NewCustomerComponent } from './components/new-customers/new-customer.component';
import { EditCustomersComponent } from './components/edit-customers/edit-customers.component';

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
      path: 'edit/:id',
      component: EditCustomersComponent,
   },
   {
      path: 'delete/:id',
      redirectTo: '',
   },
];
