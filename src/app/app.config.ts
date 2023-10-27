import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthorizationInterceptor } from './shared/services/interceptors/authorizationInterceptor';
import { authFeatureKey, authReaducer } from './auth/store/auth.reducer';

export const appConfig: ApplicationConfig = {
   providers: [
      provideRouter(routes),
      provideHttpClient(),
      provideStore(),
      provideState(authFeatureKey, authReaducer),
      provideHttpClient(withInterceptors([AuthorizationInterceptor])),
      provideStoreDevtools({
         maxAge: 25,
         logOnly: !isDevMode(),
         autoPause: true,
         trace: false,
         traceLimit: 75,
      }),
   ],
};
