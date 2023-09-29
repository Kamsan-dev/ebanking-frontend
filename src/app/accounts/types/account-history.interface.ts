import { AccountOperationDTO } from './account-operation.interface';

export interface AccountHistoryDTO {
   accountId: string;
   owner: string;
   balance: number;
   accountOperationDTOS: AccountOperationDTO[];
   currentPage: number;
   totalPages: number;
   pageSize: number;
}
