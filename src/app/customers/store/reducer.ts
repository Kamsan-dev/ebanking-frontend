import { createFeature, createReducer, on } from '@ngrx/store';
import { customerActionDelete, customerAddAction, customersActions } from './action';
import { CustomerInterface } from '../types/customer.interface';
import { CustomerStateAddInterface } from '../types/customerAddRequest';

export interface State {
   customers: CustomerInterface[] | null;
   errors: string | null;
}

const initialState: State = {
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

const initialStateAddRequest: CustomerStateAddInterface = {
   isSubmitting: false,
   isLoading: false,
   errorOnRequest: null,
};

const customerAddFeature = createFeature({
   name: 'customer-add',
   reducer: createReducer(
      initialStateAddRequest,
      on(customerAddAction.addCustomer, (state) => {
         return {
            ...state,
            isSubmitting: true,
            errorOnRequest: null,
         };
      }),
      on(customerAddAction.addCustomerSuccess, (state) => {
         return {
            ...state,
            isSubmitting: false,
            isLoading: false,
            errorOnRequest: null,
         };
      }),
      on(customerAddAction.addCustomerFailure, (state, action) => {
         return {
            ...state,
            isSubmitting: false,
            isLoading: false,
            errorOnRequest: action.errormessage,
         };
      })
   ),
});

const customerDeleteFeature = createFeature({
   name: 'customer-delete',
   reducer: createReducer(
      initialState,
      on(customerActionDelete.deleteCustomer, (state, action) => {
         return {
            ...state,
         };
      }),
      on(customerActionDelete.deleteCustomerSuccess, (state, action) => {
         const newCustomers = state.customers?.filter((c) => c.id !== action.customerId);
         return {
            ...state,
            customers: state.customers === null ? null : state.customers.slice(action.customerId - 1, 1),
            //customers: newCustomers
            errors: null,
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

export const {
   name: customerFeatureKey,
   reducer: customerReducer,
   selectCustomers,
   selectErrors,
} = customerFeature;

export const {
   name: customerAddFeatureKey,
   reducer: customerAddReducer,
   selectErrorOnRequest,
   selectIsSubmitting,
} = customerAddFeature;

export const { name: customerDeleteFeatureKey, reducer: customerDeleteReducer } = customerDeleteFeature;
