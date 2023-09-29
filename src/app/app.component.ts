import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CustomerComponent } from './customers/components/customer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [CommonModule, RouterOutlet, SidebarComponent, CustomerComponent, NavbarComponent],
   template: `
      <div class="flex w-screen h-screen overflow-hidden bg-gray-400">
         <app-sidebar />
         <div class="grow">
            <app-navbar />
            <div class="bg-white container max-w-7xl mx-auto mt-8 p-5 rounded-md "><router-outlet /></div>
         </div>
      </div>
   `,
})
export class AppComponent {}
