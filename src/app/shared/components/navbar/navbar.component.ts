import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Collapse, Dropdown, initTE } from 'tw-elements';

// initTE({ Collapse, Dropdown });

import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { selectIsAuthenticated } from 'src/app/auth/store/auth.reducer';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
   currentUser$: Observable<CurrentUserInterface | undefined>;
   isloggedIn$: Observable<boolean>;
   constructor(private store: Store) {
      this.currentUser$ = this.store.select(selectCurrentUser);
      this.isloggedIn$ = this.store.select(selectIsAuthenticated);
   }
   ngOnInit(): void {}
}
