import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class WalletPageModule { }
/**
 * modal to get all transaction Request
 */
export class MWalletTransactionRequest {
  user_id: any;
  user_type_id!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal to get all transaction Response
 */
export class MWalletTransactionResponse {
  status: any;
  balance!: string;
  transactions!: [MWalletTransactionResponseTransact];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal to get all transaction Response transaction obj
 */
export class MWalletTransactionResponseTransact {
  id!: number
  wallet_id!: number
  transaction_type!: number
  amount!: number
  description!: string
  transaction_id!: string
  created_at!: string
  updated_at!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal to get all paymentIntent Response
 */
export class MPaymentIntentResponse {
  publishableKey: any;
  clientSecret!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * modal to get all paymentIntent Request
 */
export class MPaymentIntentRequest {
  currency!: string;
  amount!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}








