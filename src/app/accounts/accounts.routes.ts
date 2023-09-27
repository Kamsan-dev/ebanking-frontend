import { Route } from '@angular/router';
import { AccountComponent } from './components/account/account.component';

export const accountsRoutes: Route[] = [
   {
      path: 'list-accounts/:customerId',
      component: AccountComponent,
   },
];
