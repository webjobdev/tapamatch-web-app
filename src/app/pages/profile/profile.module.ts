import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MHomeResponseInvite, MHomeResponseUser } from '../home/home.module';
import { MLoginResponseData } from '../login/login.module';
import { ProfileComponent } from './profile.component';

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
 * Modal to get profile sport list data
 */
export class MProfileResponseSports {
  id!: number;
  sport_name!: string;
  point_goals!: number
  created_at!: string
  updated_at!: string
  deleted_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get profile sport list 
 */
export class MSportsResponse {
  status!: boolean;
  message!: string;
  data!: [MProfileResponseSports];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get profile activity list data
 */
export class MActivitiesResponse {
  status!: boolean;
  msg!: string;
  data!: [MHomeResponseInvite];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get profile block list data
 */
export class MBlockedResponse {
  status!: boolean;
  message!: string;
  data!: [MLoginResponseData];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get profile club list request
 */
export class MAddClubRequest {
  name!: string;
  location!: string;
  city!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to delete club request
 */
export class MDeleteClubRequest {
  id!: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to update profile request
 */
export class MUpdateProfileRequest {
  fname!: string;
  lname!: string;
  user_type_id!: number;
  country!: number;
  city!: number;
  profile_image!: string;
  banner_image!: string;
  activity!: string;
  sports!: string;
  banner_description: any;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get list of friend response
 */
export class MFriendListResponse {
  status!: any;
  message!: string;
  data!: [MFriendListResponseData];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get list of friend response data
 */
export class MFriendListResponseData {
  id!: number
  user_id!: number
  receiver_id!: number
  chat_id!: string
  user!: MHomeResponseUser
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to post block unblock user request
 */
export class MBlockUnblockUserRequest {
  other_user_id!: number;
  status!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

