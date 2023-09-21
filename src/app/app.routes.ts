import { Routes } from '@angular/router';
import { customerFeatureKey, customerReducer } from './customers/store/reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as customerEffects from './customers/store/effects';

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
]);
