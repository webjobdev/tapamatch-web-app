import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  static BASE_URL = "https://tapamatch.com/api/"
  static STAGING_BASE_URL = "https://staging.tapamatch.com/api/"
  static LOGIN = "v1/login"
  static USERTYPE = "getusertype"
  static COUNTRIES = "getcountrylist"
  static CITIES = "getcitylist"
  static REGISTER = "v1/register"
  static FORGOTPASSWORD = "forgot_password"
  static CHANGEPASSWORD = "change_password"
  static LEADERBOARD = "leaderboard"
  static UPCOMINGCHALLENGES = "upcomingchallenge"
  static UPCOMINGEVENTS = "upcomingevent"
  static UPCOMINGFRIENDLY = "upcomingfriendly"
  static BANNERIMAGE = "banner-images"
  static GETPOSTS = "get-posts"
  static GETUSERPOSTS = "get-user-posts"
  static MATCHRESULT = "matchresultlist"
  static CREATEPOST = "create-post"
  static LIKE = "like"
  static CREATECOMMENT = "create-comment"
  static BLOCKEDUSER = "blocked_user_list"
  static SPORTSLIST = "sportlist"
  static ACTIVITIESLIST = "get-activity"
  static ADDCLUB = "add-club"
  static DELETECLUB = "delete-club"
  static UPDATEPROFILE = "update_profile"
  static FRIENDSHOW = "friendshow"
  static USERLIST = "userlist"
  static ADDFRIEND = "send-friend-request"
  static FILTERUSER = "filterd_user_list"
  static UPDATEPRIVATEPUBLIC = "update_profile_status"
  static REMOVEFRIEND = "remove-friend"
  static BLOCKUNBLOCK = "block_unblock_user"
  static BALANCETRANSACTION = "balance-and-transactions"
  static PAYMENTINTENT = "stripeCretatePaymentIntent"
  static CHALLENGES = "getchallengeuserwise"
  static MATCHES = "geteventuserwise"
  static FRIENDLY = "getfriendlyuserwise"
  static VENUELIST = "venuelist"
  static VENUELISTOWNER = "venue-list-owner"
  static GROUPLIST = "grouplist"
  static CREATECHALLENGE = "challenge"
  static UPDATECHALLENGE = "challengeupdate"
  static REFREELIST = "userasperusertype"
  static CREATEFRIENDLY = "friendly"
  static UPDATEFRIENDLY = "friendlyupdate"
  static USERTEAM = "getgroupuserwise"
  static AVAILFRIENDLIST = "availfriendlist"
  static CREATEEVENT = "event"
  static UPDATEEVENT = "eventupdate"
  static CREATETEAM = "group"
  static UPDATETEAM = "groupupdate"
  static GETCHALLENGEREFREEWISE = "getchallengerefereewise"
  static GETFRIENDLYREFREEWISE = "getfriendlyrefereewise"
  static UPDATESCORE = "updatescore"
  static UPDATEVENUE = "update-venue"
  static NOTIFICATIONLIST = "notificationlist"
  static FRIENDREQUESTUPDATE = "friend/update/request"
  static GROUPINVITE = "group_invite"
  static CHECKWALLETBALANCE = "check-wallet-balance"
  static FRIENDLYREQUEST = "friendly_invite"
  static EVENTREQUEST = "event-request-update"
  static REFREEINVITE = "refree_invite"
  static CHALLENGEVENUEREQUESTUPDATE = "challenge-venue-request-update"
  static FRIENDLYVENUEREQUESTUPDATE = "update-venue-friendly-request"
  static CHALLENGEACCEPT = "challenge_accept"
  static UPDATECHALLENGEVENUE = "update-challenge-venue"
  static UPDATEFRIENDLYVENUE = "update-friendly-venue"

  constructor() { }

  /**
* API error handler. it will call when the status of API call is other than 200
*/
  static ErrorHandler = {
    handleError(operation: string) {
      return (err: any) => {
        const errMsg = `error in ${operation}() retrieving `;
        console.log(`${errMsg}:`, err);
        if (err instanceof HttpErrorResponse) {
          console.log(`status: ${err.status}, ${err.statusText}`);
        }
        console.log('error ::: ' + JSON.stringify(err));
        return throwError(err);
      };
    }
  };
}
