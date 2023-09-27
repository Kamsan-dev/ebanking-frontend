import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomerInterface } from '../../types/customer.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { selectCustomers } from '../../store/reducer';
import { customerActionUpdate } from '../../store/action';
@Component({
   selector: 'app-edit-customers',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './edit-customers.component.html',
   styleUrls: ['./edit-customers.component.css'],
})
export class EditCustomersComponent implements OnInit {
   customers$: Observable<CustomerInterface[]>;
   currentCustomer: CustomerInterface = {
      name: '',
      email: '',
   };
   currentId: number = 0;

   updateCustomerForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
   });

   constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute) {
      this.customers$ = this.store.select(selectCustomers);
      this.route.paramMap.subscribe((value) => {
         this.currentId = Number(value.get('id'));
      });

      this.customers$.subscribe((customers) => {
         return customers.map((customer) => {
            if (customer.id === this.currentId) {
               this.currentCustomer = customer;
               this.updateCustomerForm.patchValue(this.currentCustomer);
            }
         });
      });
   }
   ngOnInit() {}

   onSubmitForm(): void {
      if (this.updateCustomerForm.valid) {
         const customer: CustomerInterface = {
            id: this.currentId,
            name: this.updateCustomerForm.value.name,
            email: this.updateCustomerForm.value.email,
         };
         this.store.dispatch(customerActionUpdate.updateCustomer({ customer }));
      }
   }
}
