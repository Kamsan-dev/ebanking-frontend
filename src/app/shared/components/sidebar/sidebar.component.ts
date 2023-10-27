import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authLogoutAction } from 'src/app/auth/store/auth.action';
import { Router } from '@angular/router';

@Component({
   selector: 'app-sidebar',
   standalone: true,
   imports: [CommonModule, RouterLink],
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
   constructor(private store: Store, private router: Router) {}

   handleLogoutButtonClick(): void {
      this.store.dispatch(authLogoutAction.logout());
      localStorage.clear();
      this.router.navigate(['/login']);
   }
}
