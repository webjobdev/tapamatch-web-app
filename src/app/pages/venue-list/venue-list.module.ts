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
export class UpdateScorePageModule { }

/**
 * Modal to get venue list  response 
 */
export class MVenueListResponse {
  status: any
  message: any
  data!: [MVenueListResponseData] | []
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal to get venue list response data
 */
export class MVenueListResponseData {
  id: any
  name: any
  description: any
  price: any
  balance: any
  account: any
  owner_id: any
  status: any
  monday_open: any
  monday_close: any
  tuesday_open: any
  tuesday_close: any
  wednesday_open: any
  wednesday_close: any
  thursday_open: any
  thursday_close: any
  friday_open: any
  friday_close: any
  saturday_open: any
  saturday_close: any
  sunday_open: any
  sunday_close: any
  updated_at: any
  created_at: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get venue list request data request 
 */
export class MVenueListRequestData {
  saturday_open: any
  sunday_open: any
  monday_open: any
  saturday_close: any
  sunday_close: any
  friday_open: any
  friday_close: any
  venue_id: any
  price: any
  monday_close: any
  wednesday_open: any
  status: any
  tuesday_close: any
  wednesday_close: any
  thursday_open: any
  thursday_close: any
  tuesday_open: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}



