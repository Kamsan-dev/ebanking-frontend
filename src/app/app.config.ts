import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { customerFeatureKey, customerReducer } from './customers/store/reducer';
import * as customerEffects from './customers/store/effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
   providers: [
      provideRouter(routes),
      provideHttpClient(),
      provideStore(),
      provideState(customerFeatureKey, customerReducer),
      provideEffects(customerEffects),
      provideStoreDevtools({
         maxAge: 25,
         logOnly: !isDevMode(),
         autoPause: true,
         trace: false,
         traceLimit: 75,
      }),
   ],
};
