import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, mergeAll, concatMap, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { accountsOperationsActions } from './accounts-operations.action';
import { AccountsService } from 'src/app/customers/services/accounts.service';
import { AccountHistoryDTO } from '../../types/account-history.interface';

export const accountsEffects = createEffect(
   (action$ = inject(Actions), customerService = inject(AccountsService)) => {
      return action$.pipe(
         ofType(accountsOperationsActions.loadAccountsOperations),
         exhaustMap(({ accountId, page, size }) => {
            return customerService.getAccountHistory(accountId!, page, size).pipe(
               map((data: AccountHistoryDTO) => {
                  return accountsOperationsActions.loadAccountsOperationsSuccess({ accountsHistory: data });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     accountsOperationsActions.loadAccountsOperationsFailure({
                        errormessage: errorResponse.message,
                     })
                  );
               })
            );
         })
      );
   },
   { functional: true }
);
