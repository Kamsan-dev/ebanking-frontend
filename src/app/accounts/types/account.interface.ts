import { CustomerInterface } from 'src/app/customers/types/customer.interface';

export interface AccountInterface {
   type: string;
   id: string;
   balance: number;
   createdAt: Date;
   status: string;
   currency: string | null;
   customerDTO: CustomerInterface;
   interestRate?: number;
   overDraft?: number;
}
