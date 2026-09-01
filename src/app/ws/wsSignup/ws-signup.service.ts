import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../global/global.service';
import { MGetUserTypeResponse, MGetCountriesResponse, MGetCitiesResponse, MGetCitiesRequest, MSignUpRequest, MSignUpResponse } from '../../pages/signup/signup.module';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WsSignupService {

  constructor(private httpClient: HttpClient) { }
  /**
    * Api to get list of userType
    */
  getUserType(): Observable<MGetUserTypeResponse> {
    console.log("getUserType")
    return this.httpClient.get<MGetUserTypeResponse>(GlobalService.BASE_URL + GlobalService.USERTYPE).pipe(
      map(response => {
        console.log("getUserType response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
  /**
    * Api to get list of countries
    */
  getCountries(): Observable<MGetCountriesResponse> {
    console.log("getCountries")
    return this.httpClient.get<MGetCountriesResponse>(GlobalService.BASE_URL + GlobalService.COUNTRIES).pipe(
      map(response => {
        console.log("getCountries response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }

  /**
   * Api to get list of cities
   * @param mGetCitiesReq 
   * @returns 
   */
  getCities(mGetCitiesReq: MGetCitiesRequest): Observable<MGetCitiesResponse> {
    console.log("getCities")
    return this.httpClient.get<MGetCitiesResponse>(GlobalService.BASE_URL + GlobalService.CITIES + "?country_id=" + mGetCitiesReq.country_id).pipe(
      map(response => {
        console.log("getCities response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }

  /**
   * Api to create a new user register
   * @param mSignUpReq 
   * @returns 
   */
  userSignUp(mSignUpReq: MSignUpRequest): Observable<MSignUpResponse> {
    console.log("mSignUpReq called :: ", mSignUpReq)
    console.log("mSignUpReq called JSON:: ", JSON.stringify(mSignUpReq))
    let body = new FormData();
    console.log("mSignUpReq", mSignUpReq);
    body.append('user_type_id', mSignUpReq.user_type_id.toString());
    body.append('fname', mSignUpReq.fname);
    body.append('lname', mSignUpReq.lname);
    body.append('dob', mSignUpReq.dob);
    body.append('phone', mSignUpReq.phone.toString());
    body.append('gender', mSignUpReq.gender);
    body.append('uname', mSignUpReq.uname);
    body.append('email', mSignUpReq.email);
    body.append('password', mSignUpReq.password);
    body.append('c_password', mSignUpReq.c_password);
    body.append('city', mSignUpReq.city.toString());
    body.append('country', mSignUpReq.country.toString());
    body.append('profile_image', mSignUpReq.profile_image);
    return this.httpClient.post<MSignUpResponse>(GlobalService.BASE_URL + GlobalService.REGISTER, body).pipe(
      map(response => {
        console.log("Signup response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
