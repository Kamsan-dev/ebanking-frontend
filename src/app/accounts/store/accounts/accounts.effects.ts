import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, mergeAll, concatMap, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { accountsActions } from './accounts.action';
import { AccountsService } from 'src/app/customers/services/accounts.service';
import { AccountInterface } from '../../types/account.interface';

export const accountsEffects = createEffect(
   (action$ = inject(Actions), customerService = inject(AccountsService)) => {
      return action$.pipe(
         ofType(accountsActions.loadAccounts),
         exhaustMap(({ customerId }) => {
            return customerService.getBankAccountsByCustomerId(customerId).pipe(
               map((data: AccountInterface[]) => {
                  return accountsActions.loadAccountsSuccess({ accounts: data });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     accountsActions.loadAccountsFailure({
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
