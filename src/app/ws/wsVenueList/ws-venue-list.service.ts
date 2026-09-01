import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from 'src/app/global/global.service';
import { MVenueListRequestData, MVenueListResponse } from 'src/app/pages/venue-list/venue-list.module';

@Injectable({
  providedIn: 'root'
})
export class WsVenueListService {

  constructor(private httpClient: HttpClient) { }
  /**
   * getVenues used to get venues api call
   * @returns 
   */
  getVenues(): Observable<MVenueListResponse> {
    console.log("getFriends")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MVenueListResponse>(GlobalService.BASE_URL + GlobalService.VENUELISTOWNER, { headers: headers }).pipe(
      map(response => {
        console.log("getFriends response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * updateVenue used to update venue api call
   * @param mVenueListRequestData 
   * @returns 
   */
  updateVenue(mVenueListRequestData: MVenueListRequestData): Observable<MVenueListResponse> {
    console.log("updateVenue")
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let body = new FormData()
    body.append("monday_open", mVenueListRequestData.monday_open);
    body.append("monday_close", mVenueListRequestData.monday_close);
    body.append("tuesday_open", mVenueListRequestData.tuesday_open);
    body.append("tuesday_close", mVenueListRequestData.tuesday_close);
    body.append("wednesday_open", mVenueListRequestData.wednesday_open);
    body.append("wednesday_close", mVenueListRequestData.wednesday_close);
    body.append("thursday_open", mVenueListRequestData.thursday_open);
    body.append("thursday_close", mVenueListRequestData.thursday_close);
    body.append("friday_open", mVenueListRequestData.friday_open);
    body.append("friday_close", mVenueListRequestData.friday_close);
    body.append("saturday_open", mVenueListRequestData.saturday_open);
    body.append("saturday_close", mVenueListRequestData.saturday_close);
    body.append("sunday_open", mVenueListRequestData.sunday_open);
    body.append("sunday_close", mVenueListRequestData.sunday_close);
    body.append("price", mVenueListRequestData.price);
    body.append("status", mVenueListRequestData.status);
    body.append("venue_id", mVenueListRequestData.venue_id);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MVenueListResponse>(GlobalService.BASE_URL + GlobalService.UPDATEVENUE, body, { headers: headers }).pipe(
      map(response => {
        console.log("updateVenue response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
