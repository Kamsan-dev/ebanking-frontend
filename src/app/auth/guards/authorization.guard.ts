import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { Store, select } from '@ngrx/store';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';

export const authorizationGuard = () => {
   const store = inject(Store);
   const router = inject(Router);

   store
      .select(selectCurrentUser)
      .pipe(take(1))
      .subscribe((currentUser) => {
         currentUser?.roles.includes('ADMIN') ? true : router.navigateByUrl('admin/not-authorized');
      });
};
