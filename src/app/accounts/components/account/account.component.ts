import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/customers/services/accounts.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AccountInterface } from '../../types/account.interface';
import { selectAccounts, selectHasLoaded } from '../../store/accounts/accounts.reducer';
import { accountsActions } from '../../store/accounts/accounts.action';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

@Component({
   selector: 'app-account',
   standalone: true,
   imports: [CommonModule, FormsModule, RouterModule],
   templateUrl: './account.component.html',
   styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
   customerId: number = 0;
   accounts$: Observable<Array<AccountInterface>>;
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: AccountsService,
      private store: Store
   ) {
      this.route.paramMap.subscribe((value) => {
         this.customerId = Number(value.get('customerId'));
      });
      this.accounts$ = this.store.select(selectAccounts);
   }

   ngOnInit() {
      const customerId = this.customerId;
      this.store.dispatch(accountsActions.loadAccounts({ customerId }));
      const href = this.router.url;
      console.log(this.router.url);
   }

   bankTransferButtonClick() {
      this.router.navigate(['/accounts', this.customerId, 'bank-transfer']);
   }
}
