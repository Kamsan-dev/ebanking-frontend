import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../services/customer.service';
import { inject } from '@angular/core';
import {
   customerActionDelete,
   customerActionSearch,
   customerActionUpdate,
   customerAddAction,
   customersActions,
} from './action';
import { catchError, exhaustMap, map, mergeAll, concatMap, mergeMap, of, switchMap, tap } from 'rxjs';
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

/* SEARCH CUSTOMERS EFFECTS */

export const customerSearchEffects = createEffect(
   (action$ = inject(Actions), customerService = inject(CustomerService)) => {
      return action$.pipe(
         ofType(customerActionSearch.searchCustomer),
         exhaustMap(({ keyword }) => {
            return customerService.searchCustomer(keyword).pipe(
               map((data: CustomerInterface[]) => {
                  return customerActionSearch.searchCustomerSuccess({ customers: data });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     customerActionSearch.searchCustomerFailure({
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

export const customerAddEffects = createEffect(
   (action$ = inject(Actions), customerService = inject(CustomerService)) => {
      return action$.pipe(
         ofType(customerAddAction.addCustomer),
         concatMap(({ customer }) => {
            return customerService.addCustomer(customer).pipe(
               map((customer: CustomerInterface) => {
                  return customerAddAction.addCustomerSuccess({ customer });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     customerAddAction.addCustomerFailure({
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

export const redirectAfterAddCustomerEffect = createEffect(
   (action$ = inject(Actions), router = inject(Router)) => {
      return action$.pipe(
         ofType(customerAddAction.addCustomerSuccess),
         tap(() => {
            router.navigateByUrl('/customers');
         })
      );
   },
   { functional: true, dispatch: false }
);

/* DELETE CUSTOMERS EFFECTS */

export const customerDeleteEffects = createEffect(
   (action$ = inject(Actions), customerService = inject(CustomerService)) => {
      return action$.pipe(
         ofType(customerActionDelete.deleteCustomer),
         mergeMap(({ customerId }) => {
            return customerService.deleteCustomer(customerId).pipe(
               map(() => {
                  return customerActionDelete.deleteCustomerSuccess({ customerId });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     customerActionDelete.deleteCustomerFailure({
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

/* UPDATE CUSTOMERS EFFECTS */

export const customerUpdateEffects = createEffect(
   (action$ = inject(Actions), customerService = inject(CustomerService)) => {
      return action$.pipe(
         ofType(customerActionUpdate.updateCustomer),
         concatMap(({ customer }) => {
            return customerService.updateCustomer(customer).pipe(
               map((customer: CustomerInterface) => {
                  return customerActionUpdate.updateCustomerSuccess({ customer });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     customerActionUpdate.updateCustomerFailure({
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

export const redirectAfterUpdateCustomerEffect = createEffect(
   (action$ = inject(Actions), router = inject(Router)) => {
      return action$.pipe(
         ofType(customerActionUpdate.updateCustomer),
         tap(() => {
            router.navigateByUrl('/customers');
         })
      );
   },
   { functional: true, dispatch: false }
);
