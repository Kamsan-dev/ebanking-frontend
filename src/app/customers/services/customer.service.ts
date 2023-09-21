import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerInterface } from '../types/customer.interface';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class CustomerService implements OnInit {
   constructor(private http: HttpClient) {}

   ngOnInit() {}

   getCustomers(): Observable<CustomerInterface[]> {
      return this.http.get<CustomerInterface[]>('http://localhost:8080/api/v1/customers');
   }

   addCustomer(customer: CustomerInterface): Observable<CustomerInterface> {
      return this.http.post<CustomerInterface>('http://localhost:8080/api/v1/customers', customer);
   }

   updateCustomer(customer: CustomerInterface): Observable<CustomerInterface> {
      console.log(customer);
      return this.http.put<CustomerInterface>(
         'http://localhost:8080/api/v1/customers/' + customer.id,
         customer
      );
   }

   deleteCustomer(customerId: number): Observable<void> {
      return this.http.delete<void>('http://localhost:8080/api/v1/customers/' + customerId);
   }
}
