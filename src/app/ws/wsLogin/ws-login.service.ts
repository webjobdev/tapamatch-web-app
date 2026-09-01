import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../global/global.service';
import { MLoginRequest, MLoginResponse } from '../../pages/login/login.module';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WsLoginService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Api for user login
   * @param mloginReq 
   * @returns 
   */
  userLogin(mloginReq: MLoginRequest): Observable<MLoginResponse> {
    console.log("mloginReq called :: ", mloginReq)
    console.log("mloginReq called JSON:: ", JSON.stringify(mloginReq))
    let body = new FormData();
    console.log("mloginReq", mloginReq);
    body.append('email', mloginReq.email);
    body.append('password', mloginReq.password);
    return this.httpClient.post<MLoginResponse>(GlobalService.BASE_URL + GlobalService.LOGIN, body).pipe(
      map(response => {
        console.log("login response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
