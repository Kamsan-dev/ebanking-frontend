import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../services/customer.service';
import { inject } from '@angular/core';
import { customersActions } from './action';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomerInterface } from '../types/customer.interface';

export const customerEffects = createEffect(
   (action$ = inject(Actions), customerService = inject(CustomerService)) => {
      return action$.pipe(
         ofType(customersActions.loadCustomers),
         exhaustMap(() => {
            return customerService.getCustomers().pipe(
               map((data: CustomerInterface[]) => {
                  return customersActions.loadCustomersSuccess({ customers: data });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     customersActions.loadCustomersFailure({
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
