import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Collapse, Dropdown, initTE } from 'tw-elements';

initTE({ Collapse, Dropdown });

@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {}
