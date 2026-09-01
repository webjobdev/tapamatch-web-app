import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class ForgotPasswordModule { }
/**
 * modal of forgot password request
 */
export class MForgotPasswordRequest {
  email!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal of forgot password response
 */
export class MForgotPasswordResponse {
  status!: number;
  message!: string;
  data!: [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal of change password request
 */
export class MChangePasswordRequest {
  old_password!: string;
  new_password!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal of change password response
 */
export class MChangePasswordResponse {
  status!: any;
  message!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

