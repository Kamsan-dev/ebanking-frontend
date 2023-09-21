import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { counterActions } from '../store/counter.action';
import { selectCounter } from '../store/counter.reducer';

@Component({
   selector: 'app-counter',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './counter.component.html',
   styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
   counter$: Observable<Number>;

   constructor(private store: Store) {
      this.counter$ = this.store.select(selectCounter);
   }

   onClick(type: string) {
      switch (type) {
         case 'increment': {
            this.store.dispatch(counterActions.increment());
            break;
         }
         case 'decrement': {
            this.store.dispatch(counterActions.decrement());
            break;
         }
         case 'reset': {
            this.store.dispatch(counterActions.reset());
            break;
         }
         default: {
            break;
         }
      }
   }
}
