import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerInterface } from '../types/customer.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Injectable({
   providedIn: 'root',
})
export class CustomerService implements OnInit {
   constructor(private http: HttpClient, private persistanceService: PersistanceService) {}

   ngOnInit() {}

   getCustomers(): Observable<CustomerInterface[]> {
      return this.http.get<CustomerInterface[]>(environment.host + 'customers', this.getHeaders());
   }

   addCustomer(customer: CustomerInterface): Observable<CustomerInterface> {
      return this.http.post<CustomerInterface>(environment.host + 'customers', customer);
   }

   updateCustomer(customer: CustomerInterface): Observable<CustomerInterface> {
      console.log(customer);
      return this.http.put<CustomerInterface>(environment.host + 'customers/' + customer.id, customer);
   }

   deleteCustomer(customerId: number): Observable<void> {
      return this.http.delete<void>(environment.host + 'customers/' + customerId);
   }

   searchCustomer(keyword: string): Observable<CustomerInterface[]> {
      return this.http.get<CustomerInterface[]>(environment.host + 'customers/search?keyword=' + keyword);
   }

   getHeaders(): Object {
      return {
         headers: {
            Authorization: 'Bearer ' + this.persistanceService.get('access_token'),
         },
      };
   }
}
