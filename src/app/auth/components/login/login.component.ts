import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authLoginAction } from '../../store/auth.action';

@Component({
   selector: 'app-login',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
   loginForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private store: Store
   ) {
      this.loginForm = this.fb.nonNullable.group({
         username: ['user1', Validators.required],
         password: ['12345', Validators.required],
      });
   }
   ngOnInit(): void {}

   onSubmitForm(): void {
      console.log(this.loginForm.getRawValue());
      const request = {
         username: this.loginForm.value.username,
         password: this.loginForm.value.password,
      };
      this.store.dispatch(authLoginAction.login({ request }));
   }
}
