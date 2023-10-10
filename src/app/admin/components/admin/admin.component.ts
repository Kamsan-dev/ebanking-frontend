import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from 'src/app/customers/components/customer.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-admin',
   standalone: true,
   imports: [CommonModule, CustomerComponent, NavbarComponent, SidebarComponent, RouterOutlet],
   styleUrls: ['./admin.component.css'],
   template: `
      <div class="flex w-screen h-screen overflow-hidden bg-gray-400">
         <app-sidebar />
         <div class="grow">
            <app-navbar />
            <div class="bg-white container max-w-7xl mx-auto mt-8 p-5 rounded-md min-h-screen">
               <router-outlet />
            </div>
         </div>
      </div>
   `,
})
export class AdminComponent {}
