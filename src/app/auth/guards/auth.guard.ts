import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { selectIsAuthenticated } from 'src/app/auth/store/auth.reducer';
import { Store, select } from '@ngrx/store';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authGuard = () => {
   const store = inject(Store);
   const router = inject(Router);

   return store.pipe(
      select(selectIsAuthenticated),
      tap((isLogged) => {
         console.log(isLogged);
         isLogged ? true : router.navigate(['/login']);
      })
   );
};
