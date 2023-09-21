import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
   providers: [
      provideRouter(routes),
      provideHttpClient(),
      provideStore(),
      provideStoreDevtools({
         maxAge: 25,
         logOnly: !isDevMode(),
         autoPause: true,
         trace: false,
         traceLimit: 75,
      }),
   ],
};
