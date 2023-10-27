import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { Store, select } from '@ngrx/store';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authorizationGuard = () => {
   const store = inject(Store);
   const router = inject(Router);

   return store.pipe(
      select(selectCurrentUser),
      tap((currentUser) => {
         console.log(currentUser);
         currentUser?.roles.includes('ADMIN') ? true : router.navigate(['/admin/not-authorized']);
      })
   );
};
