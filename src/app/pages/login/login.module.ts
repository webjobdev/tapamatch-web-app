import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

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
export class LoginPageModule { }


/**
 * Modal for user login  Request
 */
export class MLoginRequest {
  email!: string;
  password!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for user login  Response
 */
export class MLoginResponse {
  token!: string;
  status!: boolean;
  message!: string;
  data!: [MLoginResponseData];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


/**
 * Modal for user login Resonse data field
 */
export class MLoginResponseData {
  id!: number;
  user_type_id!: number;
  fname!: string;
  lname!: string;
  dob!: string;
  phone!: string;
  gender!: string;
  uname!: string;
  email!: string;
  email_verified_at!: string;
  isAdmin!: string;
  remember_token!: any;
  device_type!: string;
  device_token!: string;
  profile_image!: string;
  banner_description!: string;
  banner_image!: string;
  is_profile_private!: number;
  sports!: [MLoginResponseSports];
  club!: string;
  activity!: [MLoginResponseActivity];
  country!: number;
  state!: string;
  city!: number;
  created_at!: string;
  updated_at!: string;
  user_type!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for user login Resonse sports field
 */
export class MLoginResponseSports {
  id!: number;
  sport_name!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for user login Resonse activity field
 */
export class MLoginResponseActivity {
  id!: number;
  name!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
