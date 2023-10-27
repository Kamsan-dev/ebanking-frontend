import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { authLoginAction } from './auth/store/auth.action';
import { Router } from '@angular/router';
import { PersistanceService } from './shared/services/persistance.service';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [CommonModule, RouterOutlet],
   template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
   constructor(
      private store: Store,
      private router: Router,
      private persistanceService: PersistanceService
   ) {}
   ngOnInit(): void {
      /* if user possess an access token, redirect to admin/customers page instead of login page */
      const token = this.persistanceService.get('access_token');
      if (token) {
         const jwToken: any = {
            'access-token': token,
         };
         this.store.dispatch(authLoginAction.loginSuccess({ jwToken }));
         this.router.navigateByUrl('/admin/customers');
      }
   }
}
