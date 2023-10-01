import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountsService } from 'src/app/customers/services/accounts.service';
import { inject } from '@angular/core';
import { accountTransferActions } from './bank-transfer.action';
import { catchError, exhaustMap, map, mergeAll, concatMap, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountTransferInterface } from '../../types/account-transfer.interface';

export const accountTransferEffect = createEffect(
   (action$ = inject(Actions), accountsService = inject(AccountsService)) => {
      return action$.pipe(
         ofType(accountTransferActions.transfer),
         concatMap(({ accountIdSource, transferData }) => {
            return accountsService.transferOperation(accountIdSource, transferData).pipe(
               map((transferData: AccountTransferInterface) => {
                  return accountTransferActions.transferSuccess({ transferData });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     accountTransferActions.transferFailure({
                        errormessage: errorResponse.error,
                     })
                  );
               })
            );
         })
      );
   },
   { functional: true }
);

export const redirectAfterAccountTransferEffect = createEffect(
   (action$ = inject(Actions), router = inject(Router)) => {
      return action$.pipe(
         ofType(accountTransferActions.transfer),
         tap(() => {
            router.navigateByUrl('/customers');
         })
      );
   },
   { functional: true, dispatch: false }
);
