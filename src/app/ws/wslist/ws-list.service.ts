import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from 'src/app/global/global.service';
import { MCreateChallengeRequest, MCreateChallengeResponse, MCreateEventRequest, MCreateEventResponse, MCreateFriendlyRequest, MCreateFriendlyResponse, MCreateTeamRequest, MListChallengeResponse, MListEventResponse, MListFriendlyResponse, MListGroupResponse, MListRefreeResponse, MListVenueResponse } from 'src/app/pages/list/list.module';

@Injectable({
  providedIn: 'root'
})
export class WsListService {

  constructor(private httpClient: HttpClient) { }
  /**
   * get challenges api
   * @returns 
   */
  getChallenges(): Observable<MListChallengeResponse> {
    console.log("getChallenges")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MListChallengeResponse>(GlobalService.BASE_URL + GlobalService.CHALLENGES + "/" + userId, { headers: headers }).pipe(
      map(response => {
        console.log("getChallenges response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * get events api
   * @returns 
   */
  getEvents(): Observable<MListEventResponse> {
    console.log("getEvents")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MListEventResponse>(GlobalService.BASE_URL + GlobalService.MATCHES + "/" + userId, { headers: headers }).pipe(
      map(response => {
        console.log("getEvents response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * get friendly api
   * @returns 
   */
  getFriendly(): Observable<MListFriendlyResponse> {
    console.log("getFriendly")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MListFriendlyResponse>(GlobalService.BASE_URL + GlobalService.FRIENDLY + "/" + userId, { headers: headers }).pipe(
      map(response => {
        console.log("getFriendly response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * getVenueList use to get venue list api call
   * @returns 
   */
  getVenueList(): Observable<MListVenueResponse> {
    console.log("getVenueList")
    return this.httpClient.get<MListVenueResponse>(GlobalService.BASE_URL + GlobalService.VENUELIST).pipe(
      map(response => {
        console.log("getVenueList response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * getGroupList used to get grouplist api call
   * @returns 
   */
  getGroupList(): Observable<MListGroupResponse> {
    console.log("getGroupList")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MListGroupResponse>(GlobalService.BASE_URL + GlobalService.GROUPLIST, { headers: headers }).pipe(
      map(response => {
        console.log("getGroupList response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * getRefree used to get refrees api call
   * @returns 
   */
  getRefree(): Observable<MListRefreeResponse> {
    console.log("getRefree")
    return this.httpClient.get<MListRefreeResponse>(GlobalService.BASE_URL + GlobalService.REFREELIST + "?user_type=18,19").pipe(
      map(response => {
        console.log("getRefree response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }

  /**
   * createChallenge used to create a new challenge api call
   * @param mCreateChallengeRequest 
   * @returns 
   */
  createChallenge(mCreateChallengeRequest: MCreateChallengeRequest): Observable<MCreateChallengeResponse> {
    console.log("createChallenge", mCreateChallengeRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    console.log("c_date", mCreateChallengeRequest.c_date);
    body.append('c_date', mCreateChallengeRequest.c_date);
    body.append('c_desc', mCreateChallengeRequest.c_desc);
    body.append('c_invite', mCreateChallengeRequest.c_invite);
    body.append('c_location', mCreateChallengeRequest.c_location);
    body.append('c_location_id', mCreateChallengeRequest.c_location_id.toString());
    body.append('c_refree_id', mCreateChallengeRequest.c_refree_id);
    body.append('c_sport_id', mCreateChallengeRequest.c_sport_id);
    body.append('c_time', mCreateChallengeRequest.c_time);
    body.append('c_title', mCreateChallengeRequest.c_title);
    body.append('user_id', mCreateChallengeRequest.user_id.toString());

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateChallengeResponse>(GlobalService.BASE_URL + GlobalService.CREATECHALLENGE, body, { headers: headers }).pipe(
      map(response => {
        console.log("createChallenge response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateSelectedChallenge used to update selected challenge api call
   * @param mCreateChallengeRequest 
   * @param challengeId 
   * @returns 
   */
  updateSelectedChallenge(mCreateChallengeRequest: MCreateChallengeRequest, challengeId: any): Observable<MCreateChallengeResponse> {
    console.log("updateSelectedChallenge", mCreateChallengeRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    console.log("c_date", mCreateChallengeRequest.c_date);
    body.append('c_date', mCreateChallengeRequest.c_date);
    body.append('c_desc', mCreateChallengeRequest.c_desc);
    body.append('c_invite', mCreateChallengeRequest.c_invite);
    body.append('c_location', mCreateChallengeRequest.c_location);
    body.append('c_location_id', mCreateChallengeRequest.c_location_id.toString());
    body.append('c_refree_id', mCreateChallengeRequest.c_refree_id);
    body.append('c_sport_id', mCreateChallengeRequest.c_sport_id);
    body.append('c_time', mCreateChallengeRequest.c_time);
    body.append('c_title', mCreateChallengeRequest.c_title);
    body.append('user_id', mCreateChallengeRequest.user_id.toString());

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateChallengeResponse>(GlobalService.BASE_URL + GlobalService.UPDATECHALLENGE + "/" + challengeId, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateSelectedChallenge response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * createFriendly used to create new friendly api call
   * @param mCreateFriendlyRequest 
   * @returns 
   */
  createFriendly(mCreateFriendlyRequest: MCreateFriendlyRequest): Observable<MCreateFriendlyResponse> {
    console.log("createFriendly", mCreateFriendlyRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    console.log("frd_date", mCreateFriendlyRequest.frd_date);
    body.append('frd_date', mCreateFriendlyRequest.frd_date);
    body.append('frd_desc', mCreateFriendlyRequest.frd_desc);
    body.append('frd_invite', mCreateFriendlyRequest.frd_invite);
    body.append('frd_location', mCreateFriendlyRequest.frd_location);
    body.append('frd_location_id', mCreateFriendlyRequest.frd_location_id.toString());
    body.append('frd_ref_id', mCreateFriendlyRequest.frd_ref_id);
    body.append('frd_sport_id', mCreateFriendlyRequest.frd_sport_id);
    body.append('frd_time', mCreateFriendlyRequest.frd_time);
    body.append('frd_title', mCreateFriendlyRequest.frd_title);
    body.append('user_id', mCreateFriendlyRequest.user_id.toString());

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateFriendlyResponse>(GlobalService.BASE_URL + GlobalService.CREATEFRIENDLY, body, { headers: headers }).pipe(
      map(response => {
        console.log("createFriendly response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateSelectedFriendly used to update selected friendly api call
   * @param mCreateFriendlyRequest 
   * @param friendlyId 
   * @returns 
   */
  updateSelectedFriendly(mCreateFriendlyRequest: MCreateFriendlyRequest, friendlyId: any): Observable<MCreateFriendlyResponse> {
    console.log("updateSelectedFriendly", mCreateFriendlyRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    console.log("frd_date", mCreateFriendlyRequest.frd_date);
    body.append('frd_date', mCreateFriendlyRequest.frd_date);
    body.append('frd_desc', mCreateFriendlyRequest.frd_desc);
    body.append('frd_invite', mCreateFriendlyRequest.frd_invite);
    body.append('frd_location', mCreateFriendlyRequest.frd_location);
    body.append('frd_location_id', mCreateFriendlyRequest.frd_location_id.toString());
    body.append('frd_ref_id', mCreateFriendlyRequest.frd_ref_id);
    body.append('frd_sport_id', mCreateFriendlyRequest.frd_sport_id);
    body.append('frd_time', mCreateFriendlyRequest.frd_time);
    body.append('frd_title', mCreateFriendlyRequest.frd_title);
    body.append('user_id', mCreateFriendlyRequest.user_id.toString());

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateFriendlyResponse>(GlobalService.BASE_URL + GlobalService.UPDATEFRIENDLY + "/" + friendlyId, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateSelectedFriendly response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * createEvent used to create new event api call
   * @param mCreateEventRequest 
   * @returns 
   */
  createEvent(mCreateEventRequest: MCreateEventRequest): Observable<MCreateEventResponse> {
    console.log("createEvent", mCreateEventRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    console.log("e_date", mCreateEventRequest.e_date);
    body.append('e_date', mCreateEventRequest.e_date);
    body.append('e_group', mCreateEventRequest.e_group);
    body.append('e_invite', mCreateEventRequest.e_invite);
    body.append('e_location', mCreateEventRequest.e_location);
    body.append('e_location_id', mCreateEventRequest.e_location_id.toString());
    body.append('e_sport_id', mCreateEventRequest.e_sport_id);
    body.append('e_time', mCreateEventRequest.e_time);
    body.append('event_name', mCreateEventRequest.event_name);
    body.append('user_id', mCreateEventRequest.user_id.toString());
    if (mCreateEventRequest.e_image != undefined) {
      body.append('e_image', mCreateEventRequest.e_image);
    }


    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateEventResponse>(GlobalService.BASE_URL + GlobalService.CREATEEVENT, body, { headers: headers }).pipe(
      map(response => {
        console.log("createEvent response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateSelectedEvent used to update selected event api call
   * @param mCreateEventRequest 
   * @param eventId 
   * @returns 
   */
  updateSelectedEvent(mCreateEventRequest: MCreateEventRequest, eventId: any): Observable<MCreateEventResponse> {
    console.log("createEvent", mCreateEventRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    console.log("e_date", mCreateEventRequest.e_date);
    body.append('e_date', mCreateEventRequest.e_date);
    body.append('e_group', mCreateEventRequest.e_group);
    body.append('e_invite', mCreateEventRequest.e_invite);
    body.append('e_location', mCreateEventRequest.e_location);
    body.append('e_location_id', mCreateEventRequest.e_location_id.toString());
    body.append('e_sport_id', mCreateEventRequest.e_sport_id);
    body.append('e_time', mCreateEventRequest.e_time);
    body.append('event_name', mCreateEventRequest.event_name);
    body.append('user_id', mCreateEventRequest.user_id.toString());
    if (mCreateEventRequest.e_image != undefined) {
      body.append('e_image', mCreateEventRequest.e_image);
    }

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateEventResponse>(GlobalService.BASE_URL + GlobalService.UPDATEEVENT + "/" + eventId, body, { headers: headers }).pipe(
      map(response => {
        console.log("createEvent response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * createTeam used to create new team api call
   * @param mCreateTeamRequest 
   * @returns 
   */
  createTeam(mCreateTeamRequest: MCreateTeamRequest): Observable<MCreateEventResponse> {
    console.log("createTeam", mCreateTeamRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    body.append('grp_about', mCreateTeamRequest.grp_about);
    body.append('grp_invite', mCreateTeamRequest.grp_invite);
    body.append('grp_sport_id', mCreateTeamRequest.grp_sport_id.toString());
    body.append('grp_name', mCreateTeamRequest.grp_name);
    body.append('grp_image', mCreateTeamRequest.grp_image);
    body.append('grp_gender', mCreateTeamRequest.grp_gender);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateEventResponse>(GlobalService.BASE_URL + GlobalService.CREATETEAM, body, { headers: headers }).pipe(
      map(response => {
        console.log("createTeam response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateSelectedTeam used to update selected team api call
   * @param mCreateTeamRequest 
   * @param teamId 
   * @returns 
   */
  updateSelectedTeam(mCreateTeamRequest: MCreateTeamRequest, teamId: any): Observable<MCreateEventResponse> {
    console.log("updateSelectedTeam", mCreateTeamRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    body.append('grp_about', mCreateTeamRequest.grp_about);
    body.append('grp_invite', mCreateTeamRequest.grp_invite);
    body.append('grp_sport_id', mCreateTeamRequest.grp_sport_id.toString());
    body.append('grp_name', mCreateTeamRequest.grp_name);
    // body.append('user_id', mCreateTeamRequest.user_id.toString());
    body.append('grp_image', mCreateTeamRequest.grp_image);
    body.append('grp_gender', mCreateTeamRequest.grp_gender);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MCreateEventResponse>(GlobalService.BASE_URL + GlobalService.UPDATETEAM + "/" + teamId, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateSelectedTeam response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
