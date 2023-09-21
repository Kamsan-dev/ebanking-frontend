import { createActionGroup, emptyProps } from '@ngrx/store';

export const counterActions = createActionGroup({
   source: 'counter',
   events: {
      reset: emptyProps(),
      increment: emptyProps(),
      decrement: emptyProps(),
   },
});
