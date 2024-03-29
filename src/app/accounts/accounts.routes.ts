import { Route } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AccountOperationsComponent } from './components/account-operations/account-operations.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';

export const accountsRoutes: Route[] = [
   {
      path: 'list-accounts/:customerId',
      component: AccountComponent,
   },
   {
      path: ':accountId/transaction-history',
      component: AccountOperationsComponent,
   },
   {
      path: ':customerId/bank-transfer',
      component: BankTransferComponent,
   },
];
