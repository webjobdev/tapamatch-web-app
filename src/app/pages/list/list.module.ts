import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MHomeUpcomingChallengeResponseData, MHomeUpcomingEventResponseData, MHomeUpcomingFriendlyResponseData } from '../home/home.module';
import { MLoginResponseData } from '../login/login.module';
import { ListComponent } from './list.component';

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
export class ListModule { }

/**
 * MListEventResponse list of matches response
 */
export class MListEventResponse {
  status!: boolean
  message!: string
  data!: [MHomeUpcomingEventResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MListChallengeResponse list of challenges response
 */
export class MListChallengeResponse {
  status!: boolean
  message!: string
  data!: [MHomeUpcomingChallengeResponseData] | []
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MListFriendlyResponse list of friendly response
 */
export class MListFriendlyResponse {
  status!: boolean
  message!: string
  data!: [MHomeUpcomingFriendlyResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MListVenueResponse list of all venues
 */
export class MListVenueResponse {
  status!: boolean
  message!: string
  data!: [MListVenueResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MListVenueResponseData list of all venue data 
 */
export class MListVenueResponseData {
  id!: number
  name!: string
  description!: string
  price!: string
  balance!: 80
  account!: string
  owner_id!: 150
  status!: 1
  monday_open!: string
  monday_close!: string
  tuesday_open!: string
  tuesday_close!: string
  wednesday_open!: string
  wednesday_close!: string
  thursday_open!: string
  thursday_close!: string
  friday_open: any
  friday_close: any
  saturday_open: any
  saturday_close: any
  sunday_open: any
  sunday_close: any
  updated_at!: string
  created_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MListGroupResponse list of all groups in response modal
 */
export class MListGroupResponse {
  status!: boolean
  message!: string
  data!: [MListGroupResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MListGroupResponseData list of group data response
 */
export class MListGroupResponseData {
  id!: number
  user_id!: number
  grp_name!: string
  grp_sport_id!: any
  grp_gender!: string
  grp_location!: any
  grp_image!: string
  grp_about!: string
  grp_invite!: string
  deleted_at!: any
  created_at!: string
  updated_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MListRefreeResponse list of refrees response
 */
export class MListRefreeResponse {
  status!: boolean
  message!: string
  data!: [MLoginResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MCreateChallengeRequest modal to create challenge request
 */
export class MCreateChallengeRequest {
  c_location_id!: number
  c_date!: string
  c_refree_id!: string
  c_title!: string
  c_location!: string
  c_time!: string
  c_desc!: string
  user_id!: number
  c_gender!: string
  c_invite!: any
  c_sport_id!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateChallengeResponse get response of created challenge
 */
export class MCreateChallengeResponse {
  status!: boolean
  message!: string
  data!: [MCreateChallengeResponseData]
  success!: MCreateChallengeResponseSuccess
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateChallengeResponseSuccess get success response of created challenge
 */
export class MCreateChallengeResponseSuccess {
  status!: boolean
  message!: string
  data!: [MCreateChallengeResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateChallengeResponseData get response data of created challenge
 */
export class MCreateChallengeResponseData {
  c_location_id!: number
  c_date!: string
  c_refree_id!: string
  c_title!: string
  c_location!: string
  c_time!: string
  c_desc!: string
  user_id!: number
  c_gender!: any
  c_invite!: string
  c_sport_id!: string
  c_state_id!: string
  updated_at!: string
  created_at!: string
  id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MCreateFriendlyRequest create new friendly request
 */
export class MCreateFriendlyRequest {
  frd_location_id!: number
  frd_date!: string
  frd_ref_id!: string
  frd_title!: string
  frd_location!: string
  frd_time!: string
  frd_desc!: string
  user_id!: number
  frd_gender!: string
  frd_invite!: any
  frd_sport_id!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateFriendlyResponse get friendly list response modal
 */
export class MCreateFriendlyResponse {
  status!: boolean
  message!: string
  data!: [MCreateFriendlyResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateFriendlyResponseData get friendly data list response modal
 */
export class MCreateFriendlyResponseData {
  frd_location_id!: number
  frd_date!: string
  frd_ref_id!: string
  frd_title!: string
  frd_location!: string
  frd_time!: string
  frd_desc!: string
  user_id!: number
  frd_gender!: string
  frd_invite!: any
  frd_sport_id!: string
  updated_at!: string
  created_at!: string
  id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MCreateEventRequest create match request modal
 */
export class MCreateEventRequest {
  e_location_id!: number
  e_date!: string
  event_name!: string
  e_location!: string
  e_time!: string
  user_id!: number
  e_invite!: any
  e_sport_id!: string
  e_image!: any;
  e_group!: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateEventResponse get create match response modal
 */
export class MCreateEventResponse {
  status!: number
  message!: string
  data!: [MCreateEventResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateEventResponseData get create match response modal
 */
export class MCreateEventResponseData {
  e_image!: string
  user_id!: number
  event_name!: string
  e_invite!: string
  e_location!: string
  e_location_id!: number
  e_date!: string
  e_time!: string
  e_group!: string
  updated_at!: string
  created_at!: string
  id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateTeamRequest get create team request modal
 */
export class MCreateTeamRequest {
  grp_about: any;
  grp_sport_id: any;
  grp_gender: any;
  user_id: any;
  grp_name: any;
  grp_image: any;
  grp_invite: any;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateTeamResponse get create team response modal
 */
export class MCreateTeamResponse {
  status!: any
  message!: string
  data!: [MCreateTeamResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MCreateTeamResponseData get create team data response modal
 */
export class MCreateTeamResponseData {
  created_at!: string
  grp_about!: string
  grp_gender!: string
  grp_invite!: string
  grp_name!: string
  id!: number
  updated_at!: string
  user_id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}






