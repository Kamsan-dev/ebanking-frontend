import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { PersistanceService } from '../persistance.service';

export function AuthorizationInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
   /* Nul besoin d'envoyer le header authorization dans le cas du login */
   if (!request.url.includes('auth/login')) {
      const persistanceService = inject(PersistanceService);
      const clonedRequest = request.clone({
         setHeaders: {
            Authorization: 'Bearer ' + persistanceService.get('access_token'),
         },
      });

      return next(clonedRequest);
   } else return next(request);
}
