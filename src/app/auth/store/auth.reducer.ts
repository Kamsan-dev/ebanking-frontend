import { createFeature, createReducer, on } from '@ngrx/store';
import { authLoginAction } from './auth.action';
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
      on(authLoginAction.login, (state) => ({
         ...state,
         isSubmitting: true,
      })),
      on(authLoginAction.loginSuccess, (state, action) => ({
         ...state,
         isSubmitting: false,
         currentUser: loadUserProfileFromJWT(action.jwToken),
         isAuthenticated: true,
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
