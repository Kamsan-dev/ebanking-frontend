import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccountInterface } from '../../types/account.interface';

export const accountsActions = createActionGroup({
   source: '[Accounts] load',
   events: {
      loadAccounts: props<{ customerId: number }>(),
      'Load accounts success': props<{ accounts: AccountInterface[] }>(),
      'Load accounts failure': props<{ errormessage: string }>(),
   },
});
