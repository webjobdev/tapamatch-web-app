import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalService } from 'src/app/global/global.service';
import { MPaymentIntentRequest, MPaymentIntentResponse, MWalletTransactionRequest, MWalletTransactionResponse } from 'src/app/pages/wallet/wallet.module';

@Injectable({
  providedIn: 'root'
})
export class WsWalletService {

  constructor(private httpClient: HttpClient) { }
  /**
   * api to get all transactions and wallet balance
   * @param mWalletTransactionRequest 
   * @returns 
   */
  getTransaction(mWalletTransactionRequest: MWalletTransactionRequest): Observable<MWalletTransactionResponse> {
    console.log("getTransaction", mWalletTransactionRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    var params = new URLSearchParams();
    params.append('user_id', mWalletTransactionRequest.user_id)
    params.append('user_type_id', mWalletTransactionRequest.user_type_id)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.get<MWalletTransactionResponse>(GlobalService.BASE_URL + GlobalService.BALANCETRANSACTION + "?" + params, { headers: headers }).pipe(
      map(response => {
        console.log("getTransaction response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }

  /**
   * api to get payment intent and client Secret
   * @param mPaymentIntentRequest 
   * @returns 
   */
  getPaymentIntent(mPaymentIntentRequest: MPaymentIntentRequest): Observable<MPaymentIntentResponse> {
    console.log("getPaymentIntent", mPaymentIntentRequest)
    let auth = window.localStorage.getItem("auth");
    let userId = window.localStorage.getItem("id")
    console.log(auth);
    console.log(userId)
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + auth)
    return this.httpClient.post<MPaymentIntentResponse>(GlobalService.BASE_URL + GlobalService.PAYMENTINTENT, JSON.stringify(mPaymentIntentRequest), { headers: headers }).pipe(
      map(response => {
        console.log("getPaymentIntent response : ", response);
        return response;
      }), catchError(GlobalService.ErrorHandler.handleError('getData')));
  }
}
