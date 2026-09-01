import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MHomeResponseInvite, MHomeResponseUser } from '../../home/home.module';
import { MembersComponent } from './members.component';

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
export class ProfilePageModule { }
/**
 * Modal to get user list response
 */
export class MUserListResponse {
  status!: boolean;
  message!: string;
  data!: [MHomeResponseUser];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**Modal to get add friend response
 */
export class MUserAddFriendResponse {
  status!: any;
  message!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal to get filter user request
 */
export class MUserfilTerRequest {
  username!: any;
  name!: any;
  user_type!: any;
  gender!: any;
  sport_type!: any;
  activity_type!: any;
  city!: any;
  country!: any;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


