import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { Store } from '@ngrx/store';
import { selectCustomers, selectErrors } from '../store/reducer';
import { customersActions } from '../store/action';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { combineLatest } from 'rxjs';

@Component({
   selector: 'app-customer',
   standalone: true,
   imports: [CommonModule, NgHeroiconsModule, FormsModule, SearchFilterPipe],
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
   filteredValue: string = '';
   constructor(private store: Store) {}

   customers$ = this.store.select(selectCustomers);
   errors$ = this.store.select(selectErrors);

   ngOnInit(): void {
      this.store.dispatch(customersActions.loadCustomers());
   }
}
