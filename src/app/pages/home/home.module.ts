import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

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
export class HomeModule { }

/**
 * MHomeBannerResponse response to get banner images
 */
export class MHomeBannerResponse {
  status!: string;
  data!: [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MHomeUpcomingEventResponse response to get upcoming matches 
 */
export class MHomeUpcomingEventResponse {
  status!: boolean
  message!: string
  data!: [MHomeUpcomingEventResponseData] | []
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeUpcomingEventResponseData response to get upcoming matches data 
 */
export class MHomeUpcomingEventResponseData {
  id!: number
  user_id!: number
  event_name!: string
  e_sport_id!: number
  e_location_id!: number
  e_gender!: string
  e_invite!: string
  e_location!: string
  e_date!: string
  e_time!: string
  e_group!: string
  e_image!: string
  created_at!: string
  updated_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MHomeUpcomingFriendlyResponse response to get upcoming friendly  
 */
export class MHomeUpcomingFriendlyResponse {
  status!: boolean
  message!: string
  data!: [MHomeUpcomingFriendlyResponseData] | []
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MHomeUpcomingFriendlyResponseData response to get upcoming friendly  data
 */
export class MHomeUpcomingFriendlyResponseData {
  id!: number
  user_id!: number
  frd_title!: string
  frd_sport_id!: number
  frd_location_id!: number
  frd_gender!: string
  frd_location!: string
  frd_country_id!: any
  frd_state_id!: any
  frd_city_id!: any
  frd_date!: string
  frd_desc!: string
  frd_time!: string
  frd_invite!: [MHomeResponseInvite]
  frd_ref_id!: [MHomeResponseInvite]
  created_at!: string
  updated_at!: string
  referee_invite!: boolean
  user_b!: MHomeResponseUser
  user_a!: MHomeResponseUser
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MHomeResponseInvite user invite response
 */
export class MHomeResponseInvite {
  id!: number
  name!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResponseSports sport data response
 */
export class MHomeResponseSports {
  id!: number
  sport_name!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResponseChallengeObj challenge response
 */
export class MHomeResponseChallengeObj {
  id!: number
  grp_name!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResponseClub club response
 */
export class MHomeResponseClub {
  id!: number
  name!: number
  location!: number
  city!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResponseUser user response
 */
export class MHomeResponseUser {
  id!: number
  user_type_id!: number
  fname!: string
  lname!: string
  dob!: string
  phone!: number
  gender!: string
  uname!: string
  email!: string
  email_verified_at!: string
  isAdmin!: any
  device_type!: string
  device_token!: string
  profile_image!: string
  banner_description!: string
  banner_image!: string
  is_profile_private!: number
  sports!: [MHomeResponseInvite]
  club!: [MHomeResponseClub]
  activity!: [MHomeResponseInvite]
  country!: number
  state!: string
  city!: number
  created_at!: string
  updated_at!: string
  request_send!: [MHomeSendReceive]
  request_receive!: [MHomeSendReceive]
  user_type: any
  is_friend: any
  is_request: any
  is_receive: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MHomeSendReceive receive send response
 */
export class MHomeSendReceive {
  id!: number
  user_id!: number
  receiver_id!: number
  sender_id!: number
  approved!: string
  created_at!: string
  updated_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MHomeUpcomingLeaderBoardResponse get leaderboard response
 */
export class MHomeUpcomingLeaderBoardResponse {
  status!: boolean
  message!: string
  data!: [MHomeUpcomingEventResponseData]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeUpcomingLeaderBoardResponseGroup get leaderboard response group
 */
export class MHomeUpcomingLeaderBoardResponseGroup {
  id!: number
  user_id!: number
  grp_name!: string
  grp_sport_id!: string
  grp_gender!: string
  grp_location!: string
  grp_image!: string
  grp_about!: string
  grp_invite!: string
  deleted_at!: string
  created_at!: string
  updated_at!: string
  users!: [MHomeResponseInvite]
  won!: number
  lose!: number
  tie!: number
  point!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResponseTeam team response
 */
export class MHomeResponseTeam {
  id!: number
  user_id!: number
  grp_name!: string
  grp_sport_id!: any
  grp_gender!: string
  grp_location!: string
  grp_image!: string
  grp_about!: string
  grp_invite!: string
  deleted_at!: string
  created_at!: string
  updated_at!: string
  users!: [MHomeResponseInvite]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResponseChallenge challenge response
 */
export class MHomeResponseChallenge {
  id!: number
  user_id!: number
  c_title!: string
  c_sport_id!: number
  c_location_id!: number
  c_location!: string
  c_gender!: string
  c_country_id!: any
  c_state_id!: number
  c_city_id!: any
  c_date!: string
  c_desc!: string
  c_time!: string
  c_invite!: [MHomeResponseInvite]
  c_refree_id!: [MHomeResponseInvite]
  created_at!: string
  updated_at!: string
  team_b!: MHomeResponseTeam
  team_a!: MHomeResponseTeam
  user!: MHomeResponseUser
  referee_invites!: boolean
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResponseFriendly friendly response
 */
export class MHomeResponseFriendly {
  id!: number
  user_id!: number
  frd_title!: string
  frd_sport_id!: number
  frd_location_id!: number
  frd_gender!: string
  frd_location!: string
  frd_country_id!: any
  frd_state_id!: any
  frd_city_id!: any
  frd_date!: string
  frd_desc!: string
  frd_time!: string
  frd_invite!: [MHomeResponseInvite]
  frd_ref_id!: [MHomeResponseInvite]
  created_at!: string
  updated_at!: string
  referee_invite!: boolean
  user_b!: MHomeResponseUser
  user_a!: MHomeResponseUser
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeLeaderBoardResponseMatchResult match result response
 */
export class MHomeLeaderBoardResponseMatchResult {
  friendly!: [MHomeResponseFriendly]
  challenge!: [MHomeResponseChallenge]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeLeaderBoardResponseScore match result score response
 */
export class MHomeLeaderBoardResponseScore {
  groups!: [MHomeUpcomingLeaderBoardResponseGroup]
  friendly!: [MHomeResponseFriendly]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeLeaderBoardResponseData leaderboard result data response
 */
export class MHomeLeaderBoardResponseData {
  score!: MHomeLeaderBoardResponseScore
  challenge!: [MHomeResponseChallenge]
  matchresult!: MHomeLeaderBoardResponseMatchResult
  friendly!: [MHomeResponseFriendly]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeLeaderBoardResponse leaderBoard reponse
 */
export class MHomeLeaderBoardResponse {
  data!: MHomeLeaderBoardResponseData | []
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeUpcomingChallengeResponseData upcming challenge response data
 */
export class MHomeUpcomingChallengeResponseData {
  id!: number
  user_id!: number
  c_title!: string
  c_sport_id!: number
  c_location_id!: number
  c_location!: string
  c_gender!: string
  c_country_id!: any
  c_state_id!: number
  c_city_id!: any
  c_date!: string
  c_desc!: string
  c_time!: string
  c_invite!: [MHomeResponseChallengeObj]
  c_refree_id!: [MHomeResponseInvite]
  created_at!: string
  updated_at!: string
  team_b!: MHomeResponseTeam
  team_a!: MHomeResponseTeam
  user!: MHomeResponseUser
  referee_invites!: boolean
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeUpcomingChallengeResponse upcoming challege response
 */
export class MHomeUpcomingChallengeResponse {
  status!: boolean
  message!: string
  data!: [MHomeUpcomingChallengeResponseData] | []
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResultResponse result response
 */
export class MHomeResultResponse {
  status!: boolean
  message!: string
  data!: MHomeResultResponseData | {}
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomePostResponse get post response modal
 */
export class MHomePostResponse {
  current_page!: boolean
  first_page_url!: string
  from!: number
  last_page!: number
  last_page_url!: string
  next_page_url!: string
  path!: string
  per_page!: number
  prev_page_url!: string
  to!: number
  total!: number
  data!: [MHomePostResponseData] | []
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomePostResponseData post response data modal
 */
export class MHomePostResponseData {
  id!: number
  user_id!: number
  content!: string
  attachement!: string
  attachement_type!: string
  created_at!: string
  updated_at!: string
  comment_count!: number
  like_count!: number
  user!: MHomePostResponseUser
  comment!: [MHomePostResponseComment]
  is_like!: boolean
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomePostResponseComment comment post response
 */
export class MHomePostResponseComment {
  id!: number
  user_id!: number
  post_id!: number
  content!: string
  created_at!: string
  updated_at!: string
  user!: MHomePostResponseUser
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomePostResponseUser post user response
 */
export class MHomePostResponseUser {
  id!: number
  name!: string
  profile_image!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeRefreeResponse refree data response
 */
export class MHomeRefreeResponse {
  id!: number
  user_type_id!: number
  fname!: string
  lname!: string
  dob!: string
  phone!: number
  gender!: string
  uname!: string
  email!: string
  email_verified_at!: string
  isAdmin!: any
  device_type!: string
  device_token!: string
  profile_image!: string
  banner_description!: string
  banner_image!: string
  is_profile_private!: number
  sports!: [MHomeResponseSports]
  club!: any
  activity!: [MHomeResponseInvite]
  country!: number
  state!: any
  city!: number
  created_at!: string
  updated_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResultResponseChallenge challenge result response
 */
export class MHomeResultResponseChallenge {
  id!: number
  team_a!: MHomeResponseTeam
  tema_b!: number
  team_a_score!: number
  team_b_score!: number
  won_id!: number
  lose_id!: number
  referee_id!: number
  friendly_id!: number
  challenge_id!: number
  is_tie!: number
  leader_board_status!: boolean
  is_reset!: number
  reset_date!: number
  created_at!: string
  updated_at!: string
  team_b!: MHomeResponseTeam
  referee!: MHomeRefreeResponse
  challenge!: MHomeResponseChallenge
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResultResponseFriendly friendly result response
 */
export class MHomeResultResponseFriendly {
  id!: number
  team_a!: MHomeResponseTeam
  tema_b!: number
  team_a_score!: number
  team_b_score!: number
  won_id!: number
  lose_id!: number
  referee_id!: number
  friendly_id!: number
  challenge_id!: number
  is_tie!: number
  leader_board_status!: boolean
  is_reset!: number
  reset_date!: number
  created_at!: string
  updated_at!: string
  team_b!: MHomeResponseTeam
  referee!: MHomeRefreeResponse
  friendly!: MHomeResponseFriendly
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeResultResponseData result response data
 */
export class MHomeResultResponseData {
  friendly!: [MHomeResultResponseFriendly]
  challenge!: [MHomeResultResponseChallenge]
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

/**
 * MHomeCreatePostRequest create post request
 */
export class MHomeCreatePostRequest {
  content!: string
  attachement!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeCreatePostResponse create new post response
 */
export class MHomeCreatePostResponse {
  content!: string
  user_id!: number
  attachement!: string
  updated_at!: string
  created_at!: string
  id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeLikeRequest like post request
 */
export class MHomeLikeRequest {
  post_id!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeLikeResponse like post response
 */
export class MHomeLikeResponse {
  message!: string
  count!: number
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeCreateCommentRequest create comment request
 */
export class MHomeCreateCommentRequest {
  post_id!: number
  content!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeCreateCommentResponse create comment response
 */
export class MHomeCreateCommentResponse {
  id!: number
  user_id!: number
  post_id!: number
  content!: string
  created_at!: string
  updated_at!: string
  user!: MHomeCreateCommentResponseUser
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeCreateCommentResponseUser create comment response user
 */
export class MHomeCreateCommentResponseUser {
  id!: number
  name!: string
  profile_image!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * MHomeUserTeamResponse to get users team
 */
export class MHomeUserTeamResponse {
  status!: boolean
  message!: string
  data!: [MHomeResponseTeam] | [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}