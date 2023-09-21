import { Route } from '@angular/router';
import { CounterComponent } from './components/counter.component';
import { provideState, provideStore } from '@ngrx/store';
import { counterFeatureKey, counterReducer } from './store/counter.reducer';

export const counterRoutes: Route[] = [
   {
      path: '',
      component: CounterComponent,
      providers: [provideState(counterFeatureKey, counterReducer)],
   },
];
