import { Routes } from '@angular/router';
import { customerFeatureKey, customerReducer } from './customers/store/reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as customerEffects from './customers/store/effects';
import * as accountsEffects from './accounts/store/accounts/accounts.effects';
import * as accountsOperationsEffects from './accounts/store/accounts-operations/accounts-operations.effects';
import * as accountTransferEffects from './accounts/store/bank-transfer/bank-transfer.effects';
import * as authEffects from './auth/store/auth.effects';
import { accountsFeatureKey, accountsReducer } from './accounts/store/accounts/accounts.reducer';
import {
   accountOperationsFeatureKey,
   accountOperationsReducer,
} from './accounts/store/accounts-operations/accounts-operations.reducer';
import { authFeatureKey, authReaducer } from './auth/store/auth.reducer';
import { authGuard } from './auth/guards/auth.guard';
import { authorizationGuard } from './auth/guards/authorization.guard';

export const routes: Routes = ([] = [
   {
      path: 'admin',
      loadComponent: () => import('./admin/components/admin/admin.component').then((m) => m.AdminComponent),
      canActivate: [authGuard],
      children: [
         {
            path: 'customers',
            canActivate: [authorizationGuard],
            loadChildren: () => import('src/app/customers/customers.route').then((m) => m.customerRoutes),
            providers: [provideState(customerFeatureKey, customerReducer), provideEffects(customerEffects)],
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
            path: 'not-authorized',
            loadComponent: () =>
               import('./auth/components/not-authorized/not-authorized.component').then(
                  (m) => m.NotAuthorizedComponent
               ),
         },
      ],
   },
   {
      path: 'auth',
      loadChildren: () => import('src/app/auth/auth.routes').then((m) => m.authRoutes),
      providers: [provideState(authFeatureKey, authReaducer), provideEffects(authEffects)],
   },
   {
      path: '**',
      redirectTo: '/auth/login',
   },
]);
