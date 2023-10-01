import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountInterface } from 'src/app/accounts/types/account.interface';
import { AccountHistoryDTO } from 'src/app/accounts/types/account-history.interface';
import { AccountTransferInterface } from 'src/app/accounts/types/account-transfer.interface';

@Injectable({
   providedIn: 'root',
})
export class AccountsService implements OnInit {
   constructor(private http: HttpClient) {}

   ngOnInit(): void {}

   getBankAccountsByCustomerId(customerId: number): Observable<AccountInterface[]> {
      return this.http.get<AccountInterface[]>(environment.host + 'accounts/' + customerId);
   }

   getAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
      return this.http.get<AccountHistoryDTO>(
         environment.host + 'accounts/' + accountId + '/operationsHistory?page=' + page + '&size=' + size
      );
   }

   transferOperation(
      accountIdSource: string,
      operationInformations: AccountTransferInterface
   ): Observable<AccountTransferInterface> {
      return this.http.put<AccountTransferInterface>(
         environment.host + 'accounts/' + accountIdSource + '/transfer',
         operationInformations
      );
   }
}
