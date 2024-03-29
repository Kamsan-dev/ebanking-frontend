import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

export const authLoginAction = createActionGroup({
   source: '[auth] login', // namespace
   events: {
      Login: props<{ request: LoginRequestInterface }>(),
      'Login success': props<{ jwToken: any }>(),
      'Login failure': props<{ errormessage: string }>(),
   },
});

export const authLogoutAction = createActionGroup({
   source: '[auth] logout',
   events: {
      Logout: emptyProps,
      'Logout success': emptyProps,
      'Logout failure': props<{ errormessage: string }>(),
   },
});
