import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { Store } from '@ngrx/store';
import { selectCustomers, selectErrors } from '../store/reducer';
import { customerActionDelete, customersActions } from '../store/action';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-customer',
   standalone: true,
   imports: [CommonModule, NgHeroiconsModule, FormsModule, SearchFilterPipe, RouterLink],
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent implements OnInit {
   filteredValue: string = '';
   constructor(private store: Store, private router: Router) {}

   customers$ = this.store.select(selectCustomers);
   errors$ = this.store.select(selectErrors);

   ngOnInit(): void {
      this.store.dispatch(customersActions.loadCustomers());
   }

   newCustomerButtonClick(): void {
      this.router.navigate(['/customers/add']);
   }

   onDeleteCustomer(customerId: number | null): void {
      if (customerId === null) {
         return;
      }

      this.store.dispatch(customerActionDelete.deleteCustomer({ customerId }));
   }
}
