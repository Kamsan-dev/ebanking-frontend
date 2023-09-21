import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { Store } from '@ngrx/store';
import { State, selectCustomers, selectErrors, selectHasLoaded } from '../store/reducer';
import { customerActionDelete, customersActions } from '../store/action';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CustomerInterface } from '../types/customer.interface';
import { Observable } from 'rxjs';
import { NewCustomerComponent } from './new-customers/new-customer.component';

@Component({
   selector: 'app-customer',
   standalone: true,
   imports: [
      CommonModule,
      NgHeroiconsModule,
      FormsModule,
      SearchFilterPipe,
      RouterLink,
      NewCustomerComponent,
   ],
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
   filteredValue: string = '';
   customers$: Observable<CustomerInterface[]>;
   errors$: Observable<string | null>;

   constructor(private store: Store<State>, private router: Router) {
      this.customers$ = this.store.select(selectCustomers);
      this.errors$ = this.store.select(selectErrors);
   }

   ngOnInit(): void {
      this.store.select(selectHasLoaded).subscribe((hasLoaded: boolean) => {
         if (!hasLoaded) this.store.dispatch(customersActions.loadCustomers());
      });
   }

   newCustomerButtonClick(): void {
      this.router.navigate(['/customers/add']);
   }

   onDeleteCustomer(customerId: number): void {
      if (confirm('Are you sure you want to delete the customer n°' + customerId)) {
         this.store.dispatch(customerActionDelete.deleteCustomer({ customerId }));
      }
   }
}
