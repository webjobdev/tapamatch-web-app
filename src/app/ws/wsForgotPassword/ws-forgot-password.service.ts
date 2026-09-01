import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../global/global.service';
import { MChangePasswordRequest, MChangePasswordResponse, MForgotPasswordRequest, MForgotPasswordResponse } from '../../pages/forgot-password/forgot-password.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WsForgotPasswordService {

  constructor(private httpClient: HttpClient) { }

  /**
   * api call for user forgotPassword using email
   * @param mForgotPasswordReq 
   * @returns 
   */
  userForgotPassword(mForgotPasswordReq: MForgotPasswordRequest): Observable<MForgotPasswordResponse> {
    console.log("mForgotPasswordReq called :: ", mForgotPasswordReq)
    console.log("mForgotPasswordReq called JSON:: ", JSON.stringify(mForgotPasswordReq))
    let body = new FormData();
    console.log("mForgotPasswordReq", mForgotPasswordReq);
    body.append('email', mForgotPasswordReq.email);
    return this.httpClient.post<MForgotPasswordResponse>(GlobalService.BASE_URL + GlobalService.FORGOTPASSWORD, body).pipe(
      map(response => {
        console.log("userForgotPassword response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
   * userChangePassword used to change the password
   * @param mChangePasswordRequest 
   * @returns 
   */
  userChangePassword(mChangePasswordRequest: MChangePasswordRequest): Observable<MChangePasswordResponse> {
    console.log("mChangePasswordRequest called :: ", mChangePasswordRequest)
    console.log("mChangePasswordRequest called JSON:: ", JSON.stringify(mChangePasswordRequest))
    let body = new FormData();
    console.log("mChangePasswordRequest", mChangePasswordRequest);
    body.append('old_password', mChangePasswordRequest.old_password);
    body.append('new_password', mChangePasswordRequest.new_password);
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MChangePasswordResponse>(GlobalService.BASE_URL + GlobalService.CHANGEPASSWORD, body, { headers: headers }).pipe(
      map(response => {
        console.log("userChangePassword response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
