import { Route } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountOperationsComponent } from './components/account-operations/account-operations/account-operations.component';

export const accountsRoutes: Route[] = [
   {
      path: 'list-accounts/:customerId',
      component: AccountComponent,
   },
   {
      path: ':accountId/transaction-history',
      component: AccountOperationsComponent,
   },
];
