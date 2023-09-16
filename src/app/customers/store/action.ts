import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CustomerInterface } from '../types/customer.interface';

export const customersActions = createActionGroup({
   source: 'customers',
   events: {
      loadCustomers: emptyProps(),
      'Load customers success': props<{ customers: CustomerInterface[] }>(),
      'Load customers failure': props<{ errormessage: string }>(),
   },
});
