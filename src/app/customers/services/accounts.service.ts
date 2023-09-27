import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerInterface } from '../types/customer.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountInterface } from 'src/app/accounts/types/account.interface';

@Injectable({
   providedIn: 'root',
})
export class AccountsService implements OnInit {
   constructor(private http: HttpClient) {}

   ngOnInit(): void {}

   getBankAccountsByCustomerId(customerId: number): Observable<AccountInterface[]> {
      return this.http.get<AccountInterface[]>(environment.host + 'accounts/' + customerId);
   }
}
