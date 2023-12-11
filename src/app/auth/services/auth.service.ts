import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, take } from 'rxjs';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { selectCurrentUser } from '../store/auth.reducer';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   constructor(private http: HttpClient, private store: Store, private router: Router) {}

   login(requestLogin: LoginRequestInterface): Observable<any> {
      const headers = {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
      };
      const body = new HttpParams()
         .set('username', requestLogin.username)
         .set('password', requestLogin.password)
         .toString();
      return this.http.post(environment.host + 'auth/login', body, headers);
   }

   redirectAfterLoginSuccess(): void {
      this.store
         .select(selectCurrentUser)
         .pipe(take(1))
         .subscribe((currentUser) => {
            currentUser?.roles.includes('ADMIN')
               ? this.router.navigateByUrl('/admin/customers')
               : this.router.navigateByUrl('/admin/accounts/list-accounts/' + currentUser?.customer_id);
         });
   }

   getHeaders(): Object {
      return {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
      };
   }
}
