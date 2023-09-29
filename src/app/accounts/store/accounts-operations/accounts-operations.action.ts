import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccountHistoryDTO } from '../../types/account-history.interface';

export const accountsOperationsActions = createActionGroup({
   source: '[AccountsOperations] load',
   events: {
      loadAccountsOperations: props<{ accountId: string | null; page: number; size: number }>(),
      'Load accountsOperations success': props<{ accountsHistory: AccountHistoryDTO }>(),
      'Load accountsOperations failure': props<{ errormessage: string }>(),
      'Select active page': props<{ page: number }>(),
   },
});
