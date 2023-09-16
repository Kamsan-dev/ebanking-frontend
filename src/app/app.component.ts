import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CustomerComponent } from './customers/components/customer.component';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [CommonModule, RouterOutlet, SidebarComponent, CustomerComponent],
   template: ` <div class="flex w-screen h-screen overflow-hidden">
      <app-sidebar />
      <div class="grow">
         <router-outlet />
      </div>
   </div>`,
})
export class AppComponent {}
