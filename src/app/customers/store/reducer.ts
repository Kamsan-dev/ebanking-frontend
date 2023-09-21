import { createFeature, createReducer, on } from '@ngrx/store';
import { customerActionDelete, customerAddAction, customersActions } from './action';
import { CustomerInterface } from '../types/customer.interface';

export interface State {
   customers: Array<CustomerInterface>;
   errors: string | null;
   hasLoaded: boolean;
}

export const initialState: State = {
   customers: [],
   errors: null,
   hasLoaded: false,
};

const customerFeature = createFeature({
   name: 'customer',
   reducer: createReducer(
      initialState,
      on(
         customersActions.loadCustomers,
         customerActionDelete.deleteCustomer,
         customerAddAction.addCustomer,
         (state) => {
            return {
               ...state,
            };
         }
      ),
      on(customersActions.loadCustomersSuccess, (state, action) => {
         return {
            ...state,
            customers: action.customers,
            hasLoaded: true,
         };
      }),
      on(customersActions.loadCustomersFailure, (state, action) => {
         return {
            ...state,
            customers: [],
            errors: action.errormessage,
         };
      }),

      on(customerAddAction.addCustomerSuccess, (state, action) => {
         return {
            ...state,
            customers: [...state.customers, action.customer],
            errors: null,
         };
      }),
      on(customerAddAction.addCustomerFailure, (state, action) => {
         return {
            ...state,
            errors: action.errormessage,
         };
      }),

      on(customerActionDelete.deleteCustomerSuccess, (state, action) => {
         return {
            ...state,
            customers: state.customers.filter((c) => c.id !== action.customerId),
         };
      }),
      on(customerActionDelete.deleteCustomerFailure, (state, action) => {
         return {
            ...state,
            errors: action.errormessage,
         };
      })
   ),
});

// const initialStateAddRequest: CustomerStateAddInterface = {
//    isSubmitting: false,
//    isLoading: false,
//    errorOnRequest: null,
// };

export const {
   name: customerFeatureKey,
   reducer: customerReducer,
   selectCustomers,
   selectErrors,
   selectHasLoaded,
} = customerFeature;
