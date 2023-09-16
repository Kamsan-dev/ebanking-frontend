import { createFeature, createReducer, on } from '@ngrx/store';
import { customersActions } from './action';
import { CustomerInterface } from '../types/customer.interface';

export interface State {
   customers: CustomerInterface[] | null;
   errors: string | null;
}

export const initialState: State = {
   customers: null,
   errors: null,
};

const customerFeature = createFeature({
   name: 'customer',
   reducer: createReducer(
      initialState,
      on(customersActions.loadCustomersSuccess, (state, action) => {
         return {
            ...state,
            customers: [...action.customers],
            errors: null,
         };
      }),
      on(customersActions.loadCustomersFailure, (state, action) => {
         return {
            ...state,
            customers: null,
            errors: action.errormessage,
         };
      })
   ),
});

export const {
   name: customerFeatureKey,
   reducer: customerReducer,
   selectCustomers,
   selectErrors,
} = customerFeature;
