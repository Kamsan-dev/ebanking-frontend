import { Route, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const authRoutes: Route[] = [
   {
      path: 'login',
      component: LoginComponent,
   },
];
