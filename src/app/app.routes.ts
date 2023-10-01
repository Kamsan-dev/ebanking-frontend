import { Routes } from '@angular/router';
import { customerFeatureKey, customerReducer } from './customers/store/reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as customerEffects from './customers/store/effects';
import * as accountsEffects from './accounts/store/accounts/accounts.effects';
import * as accountsOperationsEffects from './accounts/store/accounts-operations/accounts-operations.effects';
import * as accountTransferEffects from './accounts/store/bank-transfer/bank-transfer.effects';
import { accountsFeatureKey, accountsReducer } from './accounts/store/accounts/accounts.reducer';
import {
   accountOperationsFeatureKey,
   accountOperationsReducer,
} from './accounts/store/accounts-operations/accounts-operations.reducer';

export const routes: Routes = ([] = [
   {
      path: 'customers',
      loadChildren: () => import('src/app/customers/customers.route').then((m) => m.customerRoutes),
      providers: [provideState(customerFeatureKey, customerReducer), provideEffects(customerEffects)],
   },
   {
      path: 'counter',
      loadChildren: () => import('src/app/counter/counter.routes').then((m) => m.counterRoutes),
   },
   {
      path: 'accounts',
      loadChildren: () => import('src/app/accounts/accounts.routes').then((m) => m.accountsRoutes),
      providers: [
         provideState(accountsFeatureKey, accountsReducer),
         provideEffects(accountsEffects),
         provideState(accountOperationsFeatureKey, accountOperationsReducer),
         provideEffects(accountsOperationsEffects),
         provideEffects(accountTransferEffects),
      ],
   },
   {
      path: '**',
      redirectTo: '/customers',
   },
]);
