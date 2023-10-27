import { createFeature, createReducer, on, union } from '@ngrx/store';
import { authLoginAction } from './auth.action';
import { authLogoutAction } from './auth.action';
import { AuthStateInterface } from '../types/authState.interface';
import jwtDecode from 'jwt-decode';

const initialState: AuthStateInterface = {
   isSubmitting: false,
   isAuthenticated: false,
   currentUser: undefined,
   errors: null,
};

const loadUserProfileFromJWT = (data: any) => {
   const access_token = data['access-token'];
   const decodedJwt: any = jwtDecode(access_token);
   const username = decodedJwt.sub;
   const roles = decodedJwt.scope;
   return {
      username: username,
      token: access_token,
      roles: roles,
   };
};

const authFeature = createFeature({
   name: 'auth',
   reducer: createReducer(
      initialState,
      on(authLoginAction.login, authLogoutAction.logout, (state) => ({
         ...state,
         isSubmitting: true,
      })),
      on(authLoginAction.loginSuccess, (state, action) => ({
         ...state,
         isSubmitting: false,
         currentUser: loadUserProfileFromJWT(action.jwToken),
         isAuthenticated: true,
      })),
      on(authLogoutAction.logoutSuccess, (state, action) => ({
         ...state,
         isSubmitting: false,
         isAuthenticated: false,
         currentUser: undefined,
      }))
   ),
});

export const {
   name: authFeatureKey,
   reducer: authReaducer,
   selectCurrentUser,
   selectIsAuthenticated,
   selectIsSubmitting,
   selectErrors,
} = authFeature;
