import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationComponent } from './notification.component';

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
export class MNotificationListResponse {
  type: any
  title: any
  status: any
  name: any
  details: any
  notification_id: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * Modal to accept or reject friend request request
 */
export class MFriendRequestAcceptRejectRequest {
  receiver_id: any
  r_status: any
  user_id: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to accept reject friend request response
 */
export class MFriendRequestAcceptRejectResponse {
  message: any
  status: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to accept reject group invite request request
 */
export class MFriendGroupInviteRequest {
  group_id: any
  r_status: any
  user_id: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to get wallet balance response
 */
export class MCheckWalletBalanceResponse {
  balance: any
  status: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to accept reject refree request request
 */
export class MRefreeAcceptRejectRequest {
  refree_id: any
  challenge_id: any
  approve: any
  user_id: any
  friendly_id: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to accept reject friendly request request
 */
export class MFriendlyAcceptRejectRequest {
  friendly_id: any
  user_id: any
  r_status: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to accept reject challenge request request
 */
export class MChallengeAcceptRejectRequest {
  challenge_id: any
  user_id: any
  approved: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to accept reject challenge / friendly venue request request
 */
export class MChallengeFriendlyAcceptRejectVenueRequest {
  venue_invite_id: any
  status: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to accept reject challenge venue change request request
 */
export class MChallengeFriendlyChangeVenue {
  venue_id: any
  friendly_id: any
  notification_id: any
  challenge_id: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


/**
 * Modal to accept reject event  change request 
 */
export class MEventAcceptRejectRequest {
  event_id: any
  user_id: any
  status: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}





