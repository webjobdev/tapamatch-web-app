import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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
export class SignUpPageModule { }

/**
 * Modal for get list of userType Response
 */
export class MGetUserTypeResponse {
  status!: boolean;
  message!: string;
  data!: [MGetUserTypeResponseData];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for get list of userType Response data field
 */
export class MGetUserTypeResponseData {
  id!: number
  name!: string
  created_at!: string
  updated_at!: string
  deleted_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for get list of countries Response
 */
export class MGetCountriesResponse {
  status!: boolean;
  message!: string;
  data!: [MGetCountriesResponseData];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal for get list of countries Response data field
 */
export class MGetCountriesResponseData {
  id!: number
  country_name!: string
  created_at!: string
  updated_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for get list of cities Request
 */
export class MGetCitiesRequest {
  country_id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for get list of cities Response
 */
export class MGetCitiesResponse {
  status!: boolean;
  message!: string;
  data!: [MGetCitiesResponseData];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal for get list of cities Response data field
 */
export class MGetCitiesResponseData {
  id!: number
  city_name!: string
  country_id!: number
  created_at!: string
  updated_on!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal for new user signup  Request
 */
export class MSignUpRequest {
  user_type_id!: number
  fname!: string
  lname!: string
  dob!: string
  phone!: number
  gender!: string
  uname!: string
  email!: string
  password!: string
  c_password!: string
  city!: number
  country!: number
  profile_image!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


/**
 * Modal for new user signup  Response
 */
export class MSignUpResponse {
  status!: any;
  message!: string;
  data!: [MSignUpResponseData];
  token!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


/**
 * Modal for new user signup  Response data field
 */
export class MSignUpResponseData {
  user_type_id!: number
  fname!: string
  lname!: string
  dob!: string
  phone!: number
  gender!: string
  uname!: string
  email!: string
  city!: number
  country!: number
  updated_at!: string
  created_at!: string
  id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

