import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from '../../global/global.service';
import { MChallengeAcceptRejectRequest, MChallengeFriendlyAcceptRejectVenueRequest, MChallengeFriendlyChangeVenue, MEventAcceptRejectRequest, MFriendGroupInviteRequest, MFriendlyAcceptRejectRequest, MFriendRequestAcceptRejectRequest, MFriendRequestAcceptRejectResponse, MNotificationListResponse, MRefreeAcceptRejectRequest } from '../../pages/notification/notification.module';

@Injectable({
  providedIn: 'root'
})
export class WsNotificationService {

  constructor(private httpClient: HttpClient) { }
  /**
   * getNotification used to get all notification api call
   * @returns 
   */
  getNotification(): Observable<any> {
    console.log("getNotification")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.get<any>(GlobalService.BASE_URL + GlobalService.NOTIFICATIONLIST + "?user_id=" + userId).pipe(
      map(response => {
        console.log("getNotification response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateFriendRequest used to update friend request api call accept/rejecct
   * @param mFriendRequestAcceptRejectRequest 
   * @returns 
   */
  updateFriendRequest(mFriendRequestAcceptRejectRequest: MFriendRequestAcceptRejectRequest): Observable<MFriendRequestAcceptRejectResponse> {
    console.log("updateFriendRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("receiver_id", mFriendRequestAcceptRejectRequest.receiver_id);
    body.append("r_status", mFriendRequestAcceptRejectRequest.r_status);
    body.append("user_id", mFriendRequestAcceptRejectRequest.user_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MFriendRequestAcceptRejectResponse>(GlobalService.BASE_URL + GlobalService.FRIENDREQUESTUPDATE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateFriendRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateTeamRequest used to update team request api call accept/reject
   * @param mFriendGroupInviteRequest 
   * @returns 
   */
  updateTeamRequest(mFriendGroupInviteRequest: MFriendGroupInviteRequest): Observable<MFriendRequestAcceptRejectResponse> {
    console.log("updateTeamRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("group_id", mFriendGroupInviteRequest.group_id);
    body.append("r_status", mFriendGroupInviteRequest.r_status);
    body.append("user_id", mFriendGroupInviteRequest.user_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MFriendRequestAcceptRejectResponse>(GlobalService.BASE_URL + GlobalService.GROUPINVITE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateTeamRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateRefreeRequest used to update refree request api call accept/reject
   * @param mRefreeAcceptRejectRequest 
   * @returns 
   */
  updateRefreeRequest(mRefreeAcceptRejectRequest: MRefreeAcceptRejectRequest): Observable<any> {
    console.log("updateRefreeRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    if (mRefreeAcceptRejectRequest.challenge_id != null && mRefreeAcceptRejectRequest.challenge_id != '' && mRefreeAcceptRejectRequest.challenge_id != 'undefined') {
      body.append("challenge_id", mRefreeAcceptRejectRequest.challenge_id);
    }
    if (mRefreeAcceptRejectRequest.friendly_id != null && mRefreeAcceptRejectRequest.friendly_id != '' && mRefreeAcceptRejectRequest.friendly_id != 'undefined') {
      body.append("friendly_id", mRefreeAcceptRejectRequest.friendly_id);
    }
    body.append("approve", mRefreeAcceptRejectRequest.approve);
    body.append("refree_id", mRefreeAcceptRejectRequest.refree_id);
    body.append("user_id", mRefreeAcceptRejectRequest.user_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.REFREEINVITE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateRefreeRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateFriendlyRequest used to update friendly request api call accept/reject
   * @param mFriendlyAcceptRejectRequest 
   * @returns 
   */
  updateFriendlyRequest(mFriendlyAcceptRejectRequest: MFriendlyAcceptRejectRequest): Observable<any> {
    console.log("updateFriendlyRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()

    body.append("friendly_id", mFriendlyAcceptRejectRequest.friendly_id);
    body.append("r_status", mFriendlyAcceptRejectRequest.r_status);
    body.append("user_id", mFriendlyAcceptRejectRequest.user_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.FRIENDLYREQUEST, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateFriendlyRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }

  /**
  * updateEventRequest used to update event request api call accept/reject
  * @param mEventAcceptRejectRequest 
  * @returns 
  */
  updateEventRequest(mEventAcceptRejectRequest: MEventAcceptRejectRequest): Observable<any> {
    console.log("updateEventRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("event_id", mEventAcceptRejectRequest.event_id);
    body.append("status", mEventAcceptRejectRequest.status);
    body.append("user_id", mEventAcceptRejectRequest.user_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.EVENTREQUEST, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateEventRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateChallengeRequest used to update challenge request api call accept/reject
   * @param mChallengeAcceptRejectRequest 
   * @returns 
   */
  updateChallengeRequest(mChallengeAcceptRejectRequest: MChallengeAcceptRejectRequest): Observable<any> {
    console.log("updateChallengeRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("challenge_id", mChallengeAcceptRejectRequest.challenge_id);
    body.append("approved", mChallengeAcceptRejectRequest.approved);
    body.append("user_id", mChallengeAcceptRejectRequest.user_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.CHALLENGEACCEPT, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateChallengeRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateChallengeVenueRequest used to update challenge venue request accept/reject
   * @param mChallengeFriendlyAcceptRejectVenueRequest 
   * @returns 
   */
  updateChallengeVenueRequest(mChallengeFriendlyAcceptRejectVenueRequest: MChallengeFriendlyAcceptRejectVenueRequest): Observable<any> {
    console.log("updateChallengeVenueRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("status", mChallengeFriendlyAcceptRejectVenueRequest.status);
    body.append("venue_invite_id", mChallengeFriendlyAcceptRejectVenueRequest.venue_invite_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.CHALLENGEVENUEREQUESTUPDATE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateChallengeVenueRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateFriendlyVenueRequest used to update friendly venue request api call accept/reject
   * @param mChallengeFriendlyAcceptRejectVenueRequest 
   * @returns 
   */
  updateFriendlyVenueRequest(mChallengeFriendlyAcceptRejectVenueRequest: MChallengeFriendlyAcceptRejectVenueRequest): Observable<any> {
    console.log("updateFriendlyVenueRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("status", mChallengeFriendlyAcceptRejectVenueRequest.status);
    body.append("venue_invite_id", mChallengeFriendlyAcceptRejectVenueRequest.venue_invite_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.FRIENDLYVENUEREQUESTUPDATE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateFriendlyVenueRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * getWalletCheck used to check the wallet balance
   * @returns 
   */
  getWalletCheck(): Observable<any> {
    console.log("getWalletCheck")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<any>(GlobalService.BASE_URL + GlobalService.CHECKWALLETBALANCE + "?user_id=" + userId + "&user_type_id=" + window.localStorage.getItem('user_type_id'), { headers: headers }).pipe(
      map(response => {
        console.log("getWalletCheck response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateChallengeNewVenueRequest used to update new challenge venue selected request api call
   * @param mChallengeFriendlyChangeVenue 
   * @returns 
   */
  updateChallengeNewVenueRequest(mChallengeFriendlyChangeVenue: MChallengeFriendlyChangeVenue): Observable<any> {
    console.log("updateChallengeNewVenueRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("challenge_id", mChallengeFriendlyChangeVenue.challenge_id);
    body.append("notification_id", mChallengeFriendlyChangeVenue.notification_id);
    body.append("venue_id", mChallengeFriendlyChangeVenue.venue_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.UPDATECHALLENGEVENUE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateChallengeNewVenueRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateFriendlyNewVenueRequest used to update new friendly venue selected request api call
   * @param mChallengeFriendlyChangeVenue 
   * @returns 
   */
  updateFriendlyNewVenueRequest(mChallengeFriendlyChangeVenue: MChallengeFriendlyChangeVenue): Observable<any> {
    console.log("updateFriendlyNewVenueRequest")
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let body = new FormData()
    body.append("friendly_id", mChallengeFriendlyChangeVenue.friendly_id);
    body.append("notification_id", mChallengeFriendlyChangeVenue.notification_id);
    body.append("venue_id", mChallengeFriendlyChangeVenue.venue_id);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<any>(GlobalService.BASE_URL + GlobalService.UPDATEFRIENDLYVENUE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateFriendlyNewVenueRequest response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
