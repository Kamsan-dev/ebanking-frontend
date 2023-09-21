import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Store } from '@ngrx/store';
import { customerAddAction } from '../../store/action';
import { CustomerInterface } from '../../types/customer.interface';
import { combineLatest } from 'rxjs';

@Component({
   selector: 'app-new-customer',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './new-customer.component.html',
   styleUrls: ['./new-customer.component.css'],
})
export class NewCustomerComponent {
   constructor(private fb: FormBuilder, private store: Store) {}

   addNewCustomerForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
   });

   onSubmitForm(): void {
      console.log('form', this.addNewCustomerForm.getRawValue());
      const customer: CustomerInterface = {
         name: this.addNewCustomerForm.value.name,
         email: this.addNewCustomerForm.value.email,
      };

      this.store.dispatch(customerAddAction.addCustomer({ customer }));
      this.addNewCustomerForm.reset();
   }
}
