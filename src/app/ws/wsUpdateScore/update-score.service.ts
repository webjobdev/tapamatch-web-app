import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from 'src/app/global/global.service';
import { MHomeUpcomingChallengeResponse, MHomeUpcomingFriendlyResponse } from 'src/app/pages/home/home.module';
import { MUpdateScoreRequest, MUpdateScoreResponse } from 'src/app/pages/update-score/update-score.module';

@Injectable({
  providedIn: 'root'
})
export class UpdateScoreService {

  constructor(private httpClient: HttpClient) { }
  /**
   * getFriendlyUserWise used to get friendly user wise api call
   * @returns 
   */
  getFriendlyUserWise(): Observable<MHomeUpcomingFriendlyResponse> {
    console.log("getFriendlyUserWise")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId);
    return this.httpClient.get<MHomeUpcomingFriendlyResponse>(GlobalService.BASE_URL + GlobalService.GETFRIENDLYREFREEWISE + "/" + userId).pipe(
      map(response => {
        console.log("getFriendlyUserWise response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * getChallengeUserWise used to getchallenge user wise api call
   * @returns 
   */
  getChallengeUserWise(): Observable<MHomeUpcomingChallengeResponse> {
    console.log("getChallengeUserWise")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId);
    return this.httpClient.get<MHomeUpcomingChallengeResponse>(GlobalService.BASE_URL + GlobalService.GETCHALLENGEREFREEWISE + "/" + userId).pipe(
      map(response => {
        console.log("getChallengeUserWise response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateScore used to update the score of match api call
   * @param mUpdateScoreRequest 
   * @returns 
   */
  updateScore(mUpdateScoreRequest: MUpdateScoreRequest): Observable<MUpdateScoreResponse> {
    console.log("updateScore", mUpdateScoreRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData();
    if (mUpdateScoreRequest.challenge_id != null || mUpdateScoreRequest.challenge_id != undefined) {
      body.append('challenge_id', mUpdateScoreRequest.challenge_id);
    } else {
      body.append('friendly_id', mUpdateScoreRequest.friendly_id);
    }
    body.append('is_tie', mUpdateScoreRequest.is_tie.toString());
    body.append('lose_id', mUpdateScoreRequest.lose_id.toString());
    body.append('won_id', mUpdateScoreRequest.won_id.toString());
    body.append('referee_id', mUpdateScoreRequest.referee_id);
    body.append('team_a', mUpdateScoreRequest.team_a.toString());
    body.append('tema_b', mUpdateScoreRequest.tema_b.toString());
    body.append('team_a_score', mUpdateScoreRequest.team_a_score);
    body.append('team_b_score', mUpdateScoreRequest.team_b_score);

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MUpdateScoreResponse>(GlobalService.BASE_URL + GlobalService.UPDATESCORE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateScore response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
