import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { Store } from '@ngrx/store';
import { State, selectCustomers, selectErrors, selectHasLoaded } from '../store/reducer';
import { customerActionDelete, customerActionSearch, customersActions } from '../store/action';
import { FormGroup, FormsModule } from '@angular/forms';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CustomerInterface } from '../types/customer.interface';
import { Observable } from 'rxjs';
import { NewCustomerComponent } from './new-customers/new-customer.component';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

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
      ReactiveFormsModule,
   ],
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
   filteredValue: string = '';
   customers$: Observable<CustomerInterface[]>;
   currentUser$: Observable<CurrentUserInterface | undefined>;
   errors$: Observable<string | null>;
   searchCustomerForm: FormGroup;

   constructor(private store: Store<State>, private router: Router, private fb: FormBuilder) {
      this.searchCustomerForm = this.fb.group({
         name: [''],
      });
      this.customers$ = this.store.select(selectCustomers);
      this.errors$ = this.store.select(selectErrors);
      this.currentUser$ = this.store.select(selectCurrentUser);
   }

   ngOnInit(): void {
      /* Load customers if they haven't been loaded */
      this.store.select(selectHasLoaded).subscribe((hasLoaded: boolean) => {
         if (!hasLoaded) this.store.dispatch(customersActions.loadCustomers());
      });
   }

   newCustomerButtonClick(): void {
      this.router.navigate(['/admin/customers/add']);
   }

   onDeleteCustomer(customerId: number): void {
      if (confirm('Are you sure you want to delete the customer n°' + customerId)) {
         this.store.dispatch(customerActionDelete.deleteCustomer({ customerId }));
      }
   }

   handleSearch(): void {
      let keyword = this.searchCustomerForm.value.name;

      this.store.dispatch(
         customerActionSearch.searchCustomer({
            keyword,
         })
      );
   }
}
