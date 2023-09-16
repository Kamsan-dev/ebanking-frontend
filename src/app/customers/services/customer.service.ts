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
}
