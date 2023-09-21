import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CustomerInterface } from '../types/customer.interface';

export const customersActions = createActionGroup({
   source: '[Customers] load',
   events: {
      loadCustomers: emptyProps(),
      'Load customers success': props<{ customers: CustomerInterface[] }>(),
      'Load customers failure': props<{ errormessage: string }>(),
   },
});

export const customerAddAction = createActionGroup({
   source: '[Customers] add',
   events: {
      addCustomer: props<{ customer: CustomerInterface }>(),
      'Add customer success': props<{ customer: CustomerInterface }>(),
      'Add customer failure': props<{ errormessage: string }>(),
   },
});

export const customerActionDelete = createActionGroup({
   source: '[Customers] delete',
   events: {
      deleteCustomer: props<{ customerId: number }>(),
      'Delete customer success': props<{ customerId: number }>(),
      'Delete customer failure': props<{ errormessage: string }>(),
   },
});

export const customerActionUpdate = createActionGroup({
   source: '[Customers] update',
   events: {
      updateCustomer: props<{ customer: CustomerInterface }>(),
      'Update customer success': props<{ customer: CustomerInterface }>(),
      'Update customer failure': props<{ errormessage: string }>(),
   },
});
