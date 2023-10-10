import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { authLoginAction } from './auth.action';
import { Router } from '@angular/router';

export const authLoginEffects = createEffect(
   (
      action$ = inject(Actions),
      authService = inject(AuthService),
      persistanceService = inject(PersistanceService)
   ) => {
      return action$.pipe(
         ofType(authLoginAction.login),
         concatMap(({ request }) => {
            return authService.login(request).pipe(
               map((jwToken: any) => {
                  persistanceService.set('access_token', jwToken['access-token']);
                  return authLoginAction.loginSuccess({ jwToken });
               }),
               catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                     authLoginAction.loginFailure({
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

export const redirectAfterLoginSuccessEffect = createEffect(
   (action$ = inject(Actions), router = inject(Router)) => {
      return action$.pipe(
         ofType(authLoginAction.loginSuccess),
         tap(() => {
            router.navigateByUrl('/admin');
         })
      );
   },
   { functional: true, dispatch: false }
);
