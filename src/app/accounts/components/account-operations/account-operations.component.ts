import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHistoryDTO } from 'src/app/accounts/types/account-history.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
   selectAccountHistory,
   selectActivePage,
} from 'src/app/accounts/store/accounts-operations/accounts-operations.reducer';
import { accountsOperationsActions } from 'src/app/accounts/store/accounts-operations/accounts-operations.action';

@Component({
   selector: 'app-account-operations',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './account-operations.component.html',
   styleUrls: ['./account-operations.component.css'],
})
export class AccountOperationsComponent {
   accountId: string | null = '';
   accountsOperations$: Observable<AccountHistoryDTO | null>;
   activePage$: Observable<number>;
   constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
      this.route.paramMap.subscribe((value) => {
         this.accountId = value.get('accountId');
      });
      this.accountsOperations$ = this.store.select(selectAccountHistory);
      this.activePage$ = this.store.select(selectActivePage);
   }

   ngOnInit() {
      const accountId = this.accountId;
      const page = 0;
      const size = 5;
      this.store.dispatch(accountsOperationsActions.selectActivePage({ page }));
      this.store.dispatch(accountsOperationsActions.loadAccountsOperations({ accountId, page, size }));
      const href = this.router.url;
      console.log(this.router.url);
   }

   goToPage(page: number): void {
      const accountId = this.accountId;
      const size = 5;
      this.store.dispatch(accountsOperationsActions.selectActivePage({ page }));
      this.store.dispatch(accountsOperationsActions.loadAccountsOperations({ accountId, page, size }));
   }

   handleNextButton(page: string): void {
      this.goToPage(Number(page) + 1);
   }

   handlePreviousButton(page: string): void {
      this.goToPage(Number(page) - 1);
   }
}
