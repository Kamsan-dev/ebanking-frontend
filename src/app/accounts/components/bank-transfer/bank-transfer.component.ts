import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInterface } from '../../types/account.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectAccounts } from '../../store/accounts/accounts.reducer';
import { Store } from '@ngrx/store';
import { AccountTransferInterface } from '../../types/account-transfer.interface';
import { accountTransferActions } from '../../store/bank-transfer/bank-transfer.action';

@Component({
   selector: 'app-bank-transfer',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './bank-transfer.component.html',
   styleUrls: ['./bank-transfer.component.css'],
})
export class BankTransferComponent implements OnInit {
   accounts$: Observable<Array<AccountInterface>>;
   transferForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
      accountIdDestination: ['', Validators.required],
      accountSourceId: ['', Validators.required],
   });

   constructor(private fb: FormBuilder, private store: Store) {
      this.accounts$ = this.store.select(selectAccounts);
   }

   ngOnInit(): void {}

   handleSubmitForm(): void {
      console.log(this.transferForm.getRawValue());
      const accountIdSource = this.transferForm.value.accountSourceId!;
      const transferData: AccountTransferInterface = {
         description: this.transferForm.value.description!,
         amount: Number(this.transferForm.value.amount!),
         accountIdDestination: this.transferForm.value.accountIdDestination!,
      };

      this.store.dispatch(accountTransferActions.transfer({ accountIdSource, transferData }));
   }
}
