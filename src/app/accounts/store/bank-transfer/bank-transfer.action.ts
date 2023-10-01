import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccountTransferInterface } from '../../types/account-transfer.interface';

export const accountTransferActions = createActionGroup({
   source: '[Accounts] transfer',
   events: {
      transfer: props<{ accountIdSource: string; transferData: AccountTransferInterface }>(),
      'Transfer success': props<{ transferData: AccountTransferInterface }>(),
      'Transfer failure': props<{ errormessage: string }>(),
   },
});
