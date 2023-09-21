import { createFeature, createReducer, on } from '@ngrx/store';
import { counterActions } from './counter.action';

export const initialState = {
   counter: 0,
};

const counterFeature = createFeature({
   name: 'counter',
   reducer: createReducer(
      initialState,
      on(counterActions.reset, (state) => {
         return {
            ...state,
            counter: 0,
         };
      }),

      on(counterActions.increment, (state) => {
         return {
            ...state,
            counter: state.counter + 1,
         };
      }),

      on(counterActions.decrement, (state) => {
         return {
            ...state,
            counter: state.counter - 1,
         };
      })
   ),
});

export const { name: counterFeatureKey, reducer: counterReducer, selectCounter } = counterFeature;
