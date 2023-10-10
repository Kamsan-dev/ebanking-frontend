import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
export interface AuthStateInterface {
   isSubmitting: boolean;
   isAuthenticated: boolean;
   currentUser: CurrentUserInterface | undefined;
   errors: string | null;
}
