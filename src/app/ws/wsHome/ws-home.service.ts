import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../global/global.service';
import { MHomeBannerResponse, MHomeCreateCommentRequest, MHomeCreateCommentResponse, MHomeCreatePostRequest, MHomeCreatePostResponse, MHomeLeaderBoardResponse, MHomeLikeRequest, MHomeLikeResponse, MHomePostResponse, MHomeResponseTeam, MHomeResultResponse, MHomeUpcomingChallengeResponse, MHomeUpcomingEventResponse, MHomeUpcomingFriendlyResponse, MHomeUserTeamResponse } from '../../pages/home/home.module';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WsHomeService {

  constructor(private httpClient: HttpClient) { }
  /**
   * get leaderboard response api
   * @returns 
   */
  getLeaderBoard(): Observable<MHomeLeaderBoardResponse> {
    console.log("getLeaderBoard")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.get<MHomeLeaderBoardResponse>(GlobalService.BASE_URL + GlobalService.LEADERBOARD + "/" + userId).pipe(
      map(response => {
        console.log("getLeaderBoard response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
     * get upcoming challenges response api
     * @returns 
     */
  getUpcomingChallenges(): Observable<MHomeUpcomingChallengeResponse> {
    console.log("getUpcomingChallenges")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.get<MHomeUpcomingChallengeResponse>(GlobalService.BASE_URL + GlobalService.UPCOMINGCHALLENGES + "/" + userId).pipe(
      map(response => {
        console.log("getUpcomingChallenges response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
     * get upcoming matches response api
     * @returns 
     */
  getUpcomingEvents(): Observable<MHomeUpcomingEventResponse> {
    console.log("getUpcomingEvents")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.get<MHomeUpcomingEventResponse>(GlobalService.BASE_URL + GlobalService.UPCOMINGEVENTS + "/" + userId).pipe(
      map(response => {
        console.log("getUpcomingEvents response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
     * get upcoming friendly response api
     * @returns 
     */
  getUpcomingFriendly(): Observable<MHomeUpcomingFriendlyResponse> {
    console.log("getUpcomingFriendly")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.get<MHomeUpcomingFriendlyResponse>(GlobalService.BASE_URL + GlobalService.UPCOMINGFRIENDLY + "/" + userId).pipe(
      map(response => {
        console.log("getUpcomingFriendly response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }

  /**
   * get match result response api
   * @returns 
   */
  getMatchResult(): Observable<MHomeResultResponse> {
    console.log("getMatchResult")
    return this.httpClient.get<MHomeResultResponse>(GlobalService.BASE_URL + GlobalService.MATCHRESULT).pipe(
      map(response => {
        console.log("getMatchResult response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
     * get banner response api
     * @returns 
     */
  getBanner(): Observable<MHomeBannerResponse> {
    console.log("getBanner")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    return this.httpClient.get<MHomeBannerResponse>(GlobalService.BASE_URL + GlobalService.BANNERIMAGE).pipe(
      map(response => {
        console.log("getBanner response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * get all the posts response api
   * @param page 
   * @returns 
   */
  getPosts(page: any): Observable<MHomePostResponse> {
    console.log("getPosts")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MHomePostResponse>(GlobalService.BASE_URL + GlobalService.GETPOSTS + "/" + userId + "?page=" + page, { headers: headers }).pipe(
      map(response => {
        console.log("getPosts response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * create new post request api
   */
  createPost(mHomeCreatePostRequest: MHomeCreatePostRequest): Observable<MHomeCreatePostResponse> {
    console.log("createPost called :: ", mHomeCreatePostRequest)
    console.log("createPost called JSON:: ", JSON.stringify(mHomeCreatePostRequest))
    let body = new FormData();
    console.log("createPost", mHomeCreatePostRequest);
    body.append('content', mHomeCreatePostRequest.content);
    body.append('attachement', mHomeCreatePostRequest.attachement);
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MHomeCreatePostResponse>(GlobalService.BASE_URL + GlobalService.CREATEPOST, body, { headers: headers }).pipe(
      map(response => {
        console.log("createPost response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * like unlike user response api
   * @param mHomeLikeRequest 
   * @returns 
   */
  likeUnlike(mHomeLikeRequest: MHomeLikeRequest): Observable<MHomeLikeResponse> {
    console.log("likeUnlike called :: ", mHomeLikeRequest)
    console.log("likeUnlike called JSON:: ", JSON.stringify(mHomeLikeRequest))
    let body = new FormData();
    console.log("likeUnlike", mHomeLikeRequest);
    body.append('post_id', mHomeLikeRequest.post_id.toString());
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MHomeLikeResponse>(GlobalService.BASE_URL + GlobalService.LIKE, body, { headers: headers }).pipe(
      map(response => {
        console.log("likeUnlike response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * create new comment api
   */
  createComent(mHomeCreateCommentRequest: MHomeCreateCommentRequest): Observable<MHomeCreateCommentResponse> {
    console.log("createComent called :: ", mHomeCreateCommentRequest)
    console.log("createComent called JSON:: ", JSON.stringify(mHomeCreateCommentRequest))
    let body = new FormData();
    console.log("createComent", mHomeCreateCommentRequest);
    body.append('post_id', mHomeCreateCommentRequest.post_id.toString());
    body.append('content', mHomeCreateCommentRequest.content.toString());
    let auth = window.localStorage.getItem("auth");
    console.log(auth);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MHomeCreateCommentResponse>(GlobalService.BASE_URL + GlobalService.CREATECOMMENT, body, { headers: headers }).pipe(
      map(response => {
        console.log("createComent response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * getUserTeam used to get team of a user
   * @returns 
   */
  getUserTeam(): Observable<MHomeUserTeamResponse> {
    console.log("getUserTeam")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MHomeUserTeamResponse>(GlobalService.BASE_URL + GlobalService.USERTEAM + "/" + userId, { headers: headers }).pipe(
      map(response => {
        console.log("getPosts response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}










