import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../global/global.service';
import { MActivitiesResponse, MAddClubRequest, MBlockedResponse, MBlockUnblockUserRequest, MDeleteClubRequest, MSportsResponse, MUpdateProfileRequest } from '../../pages/profile/profile.module';
import { map, catchError } from 'rxjs/operators';
import { MHomePostResponse } from 'src/app/pages/home/home.module';
import { MLoginResponse } from 'src/app/pages/login/login.module';
import { MUserListResponse } from 'src/app/pages/members/members/members.module';

@Injectable({
  providedIn: 'root'
})
export class WsProfileService {

  constructor(private httpClient: HttpClient) { }
  /**
   * api to get all sport List
   * @returns 
   */
  getSportList(): Observable<MSportsResponse> {
    console.log("getSportList")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.get<MSportsResponse>(GlobalService.BASE_URL + GlobalService.SPORTSLIST).pipe(
      map(response => {
        console.log("getSportList response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to get all block list user
   */
  getBlockList(): Observable<MBlockedResponse> {
    console.log("getBlockList")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MBlockedResponse>(GlobalService.BASE_URL + GlobalService.BLOCKEDUSER, { headers: headers }).pipe(
      map(response => {
        console.log("getBlockList response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to get all activity list
   */
  getActivityList(): Observable<MActivitiesResponse> {
    console.log("getActivityList")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MActivitiesResponse>(GlobalService.BASE_URL + GlobalService.ACTIVITIESLIST, { headers: headers }).pipe(
      map(response => {
        console.log("getActivityList response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to get users posts
   */
  getUserPosts(page: any): Observable<MHomePostResponse> {
    console.log("getUserPosts")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MHomePostResponse>(GlobalService.BASE_URL + GlobalService.GETUSERPOSTS + "/" + userId + "?page=" + page, { headers: headers }).pipe(
      map(response => {
        console.log("getUserPosts response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to create new club
   */
  createClub(mAddClubRequest: MAddClubRequest): Observable<MLoginResponse> {
    console.log("createClub called JSON:: ", JSON.stringify(mAddClubRequest))
    let body = new FormData();
    body.append('name', mAddClubRequest.name);
    body.append('location', mAddClubRequest.location);
    body.append('city', mAddClubRequest.city);
    let auth = window.localStorage.getItem("auth");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth);
    return this.httpClient.post<MLoginResponse>(GlobalService.BASE_URL + GlobalService.ADDCLUB, body, { headers: headers }).pipe(
      map(response => {
        console.log("createClub response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to remove club
   */
  removeClub(mDeleteClubRequest: MDeleteClubRequest): Observable<MLoginResponse> {
    console.log("removeClub called JSON:: ", JSON.stringify(mDeleteClubRequest))
    let body = new FormData();
    body.append('id', mDeleteClubRequest.id.toString());
    let auth = window.localStorage.getItem("auth");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth);
    return this.httpClient.post<MLoginResponse>(GlobalService.BASE_URL + GlobalService.DELETECLUB, body, { headers: headers }).pipe(
      map(response => {
        console.log("removeClub response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to set private and public profile
   * @param status 
   * @returns 
   */
  privatePublic(status: any): Observable<MUserListResponse> {
    console.log("privatePublic called JSON:: ", status)
    let auth = window.localStorage.getItem("auth");

    const body = new FormData();
    body.append("status", status)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth);
    return this.httpClient.post<MUserListResponse>(GlobalService.BASE_URL + GlobalService.UPDATEPRIVATEPUBLIC, body, { headers: headers }).pipe(
      map(response => {
        console.log("privatePublic response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to update profile
   */
  updateProfile(mUpdateProfileRequest: MUpdateProfileRequest): Observable<MLoginResponse> {
    console.log("updateProfile called :: ", mUpdateProfileRequest)
    let body = new FormData();
    if (mUpdateProfileRequest.user_type_id) {
      body.append('user_type_id', mUpdateProfileRequest.user_type_id.toString());
    }
    if (mUpdateProfileRequest.fname) {
      body.append('fname', mUpdateProfileRequest.fname);
    }
    if (mUpdateProfileRequest.lname) {
      body.append('lname', mUpdateProfileRequest.lname);
    }
    if (mUpdateProfileRequest.city) {
      body.append('city', mUpdateProfileRequest.city.toString());
    }
    if (mUpdateProfileRequest.country) {
      body.append('country', mUpdateProfileRequest.country.toString());
    }
    if (mUpdateProfileRequest.profile_image) {
      body.append('profile_image', mUpdateProfileRequest.profile_image);
    }
    if (mUpdateProfileRequest.banner_image) {
      body.append('banner_image', mUpdateProfileRequest.banner_image);
    }
    if (mUpdateProfileRequest.sports) {
      body.append('sports', mUpdateProfileRequest.sports);
    }
    if (mUpdateProfileRequest.activity) {
      body.append('activity', mUpdateProfileRequest.activity);
    }
    if (mUpdateProfileRequest.banner_description) {
      body.append('banner_description', mUpdateProfileRequest.banner_description);
    }
    let auth = window.localStorage.getItem("auth");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth);
    return this.httpClient.post<MLoginResponse>(GlobalService.BASE_URL + GlobalService.UPDATEPROFILE, body, { headers: headers }).pipe(
      map(response => {
        console.log("Signup response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to unfriend user
   * @param id 
   * @returns 
   */
  unfriendUser(id: any): Observable<MUserListResponse> {
    console.log("unfriendUser called JSON:: ", JSON.stringify(id))
    let body = new FormData();
    body.append('friend_id', id.toString());
    let auth = window.localStorage.getItem("auth");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth);
    return this.httpClient.post<MUserListResponse>(GlobalService.BASE_URL + GlobalService.REMOVEFRIEND, body, { headers: headers }).pipe(
      map(response => {
        console.log("unfriendUser response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api to block and unblock user
   * @param mBlockUnblockUserRequest 
   * @returns 
   */
  blockUnblock(mBlockUnblockUserRequest: MBlockUnblockUserRequest): Observable<MUserListResponse> {
    console.log("blockUnblock called JSON:: ", JSON.stringify(mBlockUnblockUserRequest))
    let body = new FormData();
    body.append('other_user_id', mBlockUnblockUserRequest.other_user_id.toString());
    body.append('status', mBlockUnblockUserRequest.status);
    let auth = window.localStorage.getItem("auth");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth);
    return this.httpClient.post<MUserListResponse>(GlobalService.BASE_URL + GlobalService.BLOCKUNBLOCK, body, { headers: headers }).pipe(
      map(response => {
        console.log("blockUnblock response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
