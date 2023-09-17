import { Pipe, PipeTransform } from '@angular/core';
import { CustomerInterface } from '../customers/types/customer.interface';

@Pipe({
   name: 'searchFilter',
   standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
   transform(customers: CustomerInterface[], filter: string): CustomerInterface[] {
      if (filter === '') {
         return customers;
      }

      return customers.filter((customer) => customer.name?.toLowerCase().includes(filter.toLowerCase()));
   }
}
