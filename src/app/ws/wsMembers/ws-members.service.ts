import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from 'src/app/global/global.service';
import { MUserAddFriendResponse, MUserfilTerRequest, MUserListResponse } from 'src/app/pages/members/members/members.module';
import { MFriendListResponse, MFriendListResponseData } from 'src/app/pages/profile/profile.module';

@Injectable({
  providedIn: 'root'
})
export class WsMembersService {

  constructor(private httpClient: HttpClient) { }
  /**
   * get specific user api 
   * @param id 
   * @returns 
   */
  getUsers(id?: any): Observable<MUserListResponse> {
    var url = GlobalService.USERLIST;
    if (id) {
      url = GlobalService.USERLIST + "/" + id;
    }
    console.log("getUsers")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MUserListResponse>(GlobalService.BASE_URL + url, { headers: headers }).pipe(
      map(response => {
        console.log("getUsers response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * get all friends api
   * @returns 
   */
  getFriends(): Observable<MFriendListResponse> {
    console.log("getFriends")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MFriendListResponse>(GlobalService.BASE_URL + GlobalService.FRIENDSHOW + "/" + userId, { headers: headers }).pipe(
      map(response => {
        console.log("getFriends response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * getAvailFriends used to get available friends api call
   * @returns 
   */
  getAvailFriends(): Observable<MFriendListResponse> {
    console.log("getAvailFriends")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.post<MFriendListResponse>(GlobalService.BASE_URL + 'v1/' + GlobalService.AVAILFRIENDLIST + "?user_id=" + userId, '').pipe(
      map(response => {
        console.log("getAvailFriends response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * filter users api
   */
  getFilterUser(mUserfilTerRequest: MUserfilTerRequest): Observable<MUserListResponse> {
    console.log("getUsers")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId);
    var params = new URLSearchParams();
    if (mUserfilTerRequest.activity_type) {
      params.append('activity_type', mUserfilTerRequest.activity_type)
    }
    if (mUserfilTerRequest.city) {
      params.append('city', mUserfilTerRequest.city)
    }
    if (mUserfilTerRequest.country) {
      params.append('country', mUserfilTerRequest.country)
    }
    if (mUserfilTerRequest.gender) {
      params.append('gender', mUserfilTerRequest.gender)
    }
    if (mUserfilTerRequest.name) {
      params.append('name', mUserfilTerRequest.name)
    }
    if (mUserfilTerRequest.sport_type) {
      params.append('sport_type', mUserfilTerRequest.sport_type)
    }
    if (mUserfilTerRequest.user_type) {
      params.append('user_type', mUserfilTerRequest.user_type)
    }
    if (mUserfilTerRequest.username) {
      params.append('username', mUserfilTerRequest.username)
    }
    console.log(params)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MUserListResponse>(GlobalService.BASE_URL + GlobalService.FILTERUSER + "?" + params, { headers: headers }).pipe(
      map(response => {
        console.log("getUsers response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * api for adding new friend
   */
  addFriend(receiver_id: any): Observable<MUserAddFriendResponse> {
    console.log("addFriend")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MUserAddFriendResponse>(GlobalService.BASE_URL + "v1/" + GlobalService.ADDFRIEND + "?user_id=" + userId + "&receiver_id=" + receiver_id, { headers: headers }).pipe(
      map(response => {
        console.log("addFriend response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
