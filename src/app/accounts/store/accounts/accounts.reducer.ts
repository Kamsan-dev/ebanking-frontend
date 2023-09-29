import { createFeature, createReducer, on } from '@ngrx/store';
import { AccountInterface } from '../../types/account.interface';
import { accountsActions } from './accounts.action';

export interface AccountsState {
   accounts: Array<AccountInterface>;
   errors: string | null;
   hasLoaded: boolean;
}

const initialState: AccountsState = {
   accounts: [],
   errors: null,
   hasLoaded: false,
};

const accountsFeature = createFeature({
   name: 'accounts',
   reducer: createReducer(
      initialState,
      on(accountsActions.loadAccounts, (state, action) => {
         return {
            ...state,
         };
      }),
      on(accountsActions.loadAccountsSuccess, (state, action) => {
         return {
            ...state,
            accounts: action.accounts,
            hasLoaded: true,
         };
      }),
      on(accountsActions.loadAccountsFailure, (state, action) => {
         return {
            ...state,
            accounts: [],
            errors: action.errormessage,
         };
      })
   ),
});

export const {
   name: accountsFeatureKey,
   reducer: accountsReducer,
   selectAccounts,
   selectErrors,
   selectHasLoaded,
} = accountsFeature;
