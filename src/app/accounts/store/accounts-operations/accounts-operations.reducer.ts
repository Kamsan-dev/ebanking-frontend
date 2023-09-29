import { createFeature, createReducer, on } from '@ngrx/store';
import { AccountHistoryDTO } from '../../types/account-history.interface';
import { accountsOperationsActions } from './accounts-operations.action';

export interface AccountHistoryState {
   accountHistory: AccountHistoryDTO | null;
   errors: string | null;
   hasLoaded: boolean;
   activePage: number;
}

const initialState: AccountHistoryState = {
   accountHistory: null,
   errors: null,
   hasLoaded: false,
   activePage: 0,
};

const accountOperationsFeature = createFeature({
   name: 'accountOperation',
   reducer: createReducer(
      initialState,
      on(accountsOperationsActions.loadAccountsOperations, (state) => {
         return {
            ...state,
         };
      }),
      on(accountsOperationsActions.loadAccountsOperationsSuccess, (state, action) => {
         return {
            ...state,
            accountHistory: action.accountsHistory,
            hasLoaded: true,
         };
      }),
      on(accountsOperationsActions.loadAccountsOperationsFailure, (state, action) => {
         return {
            ...state,
            errors: action.errormessage,
         };
      }),
      on(accountsOperationsActions.selectActivePage, (state, action) => {
         return {
            ...state,
            activePage: action.page,
         };
      })
   ),
});

export const {
   name: accountOperationsFeatureKey,
   reducer: accountOperationsReducer,
   selectAccountHistory,
   selectErrors,
   selectHasLoaded,
   selectActivePage,
} = accountOperationsFeature;
