import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   constructor(private http: HttpClient) {}

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

   getHeaders(): Object {
      return {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
      };
   }
}
