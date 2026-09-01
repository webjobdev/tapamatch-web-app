import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WsSignupService } from 'src/app/ws/wsSignup/ws-signup.service';
import { WsWalletService } from 'src/app/ws/wsWallet/ws-wallet.service';
import { MGetUserTypeResponse } from '../signup/signup.module';
import { MPaymentIntentRequest, MWalletTransactionRequest, MWalletTransactionResponse } from './wallet.module';
declare var Stripe: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  currentBal: any;
  mWalletTransactionRequest: MWalletTransactionRequest = new MWalletTransactionRequest();
  MWalletTransactionResponse: MWalletTransactionResponse = new MWalletTransactionResponse();
  mPaymentIntentRequest: MPaymentIntentRequest = new MPaymentIntentRequest();
  profileData!: any;
  profile: any;
  handler: any;
  closeResult: any;
  amount: boolean = false;
  loaderShow: boolean = false;
  clientSecret: string = '';
  elements: any;
  stripe: any;
  cardElement: any;
  inputbox: boolean = false;
  constructor(private modalService: NgbModal, private wsWallet: WsWalletService, private toast: ToastrService) {
    this.MWalletTransactionResponse.balance = "0";

  }

  ngOnInit(): void {
    this.profileData = window.localStorage.getItem("profiledata")
    console.log(JSON.parse(this.profileData))
    this.profile = JSON.parse(this.profileData);
    this.getAllTransaction();
  }
  /**
   * api call to show card elements using clientSecret
   * @param content 
   */
  addMoney(content: any) {
    if (this.mPaymentIntentRequest.amount == '' || this.mPaymentIntentRequest.amount == undefined || this.mPaymentIntentRequest.amount == 'undefined') {
      this.toast.error("Please enter amount to add!")
    } else {
      this.loaderShow = true;
      this.inputbox = false;
      const appearance = {
        theme: 'night',
        variables: {
          fontFamily: 'Sohne, system-ui, sans-serif',
          fontWeightNormal: '500',
          borderRadius: '8px',
          colorBackground: '#0A2540',
          colorPrimary: '#EFC078',
          colorPrimaryText: '#1A1B25',
          colorText: 'white',
          colorTextSecondary: 'white',
          colorTextPlaceholder: '#727F96',
          colorIconTab: 'white',
          colorLogo: 'dark'
        },
        rules: {
          '.Input, .Block': {
            backgroundColor: 'transparent',
            border: '1.5px solid var(--colorPrimary)'
          }
        }
      };

      this.mPaymentIntentRequest.currency = "EUR"
      this.wsWallet.getPaymentIntent(this.mPaymentIntentRequest).toPromise().then(resPi => {
        if (resPi && resPi.clientSecret) {
          this.clientSecret = resPi.clientSecret
          const secret = this.clientSecret;
          const options = {
            clientSecret: resPi.clientSecret,
            appearance: appearance
          };
          this.stripe = Stripe('pk_live_51I0lgzF0ulBN751jDgMoCWMvjkHa2svPTSKj2xkd4BiBfKWILs3o6bFQ0HycLbbPMAgyyPexR1WSFJJlk5XBrb8h00TfLtPrAB');
          this.elements = this.stripe.elements({ secret, appearance });
          this.loaderShow = false;
          const config: NgbModalOptions = {
            backdrop: 'static',

            windowClass: 'slideInUp'
          };
          this.modalService.open(content, config).result.then((result) => {
            console.log("Closed with:", result)
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            console.log("Dismissed", reason)
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
          console.log("content", content)
          this.cardElement = this.elements.create("card", {
            style: {
              base: {
                color: "#32325D",
                fontWeight: 500,
                fontFamily: "Inter, Open Sans, Segoe UI, sans-serif",
                fontSize: "20px",
                fontSmoothing: "antialiased",

                "::placeholder": {
                  color: "#CFD7DF"
                }
              },
              invalid: {
                color: "#E25950"
              }
            }
          });
          this.cardElement.mount("#card-element");
        } else {
          this.loaderShow = false;
          this.toast.error("Something went wrong!");
        }
      }, error => {
        this.loaderShow = false;
        console.log("getPaymentIntent error", error)
        this.toast.error(error);
      })
    }

  }
  /**
   * dismiss all existing modals
   */
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log("ESC", reason)
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log("BACKDROP_CLICK", reason)
      return 'by clicking on a backdrop';
    } else {
      console.log("else", reason)
      return `with: ${reason}`;
    }
  }
  /**
   * click of Add Money button to call api confirmCardPayment of stripe
   */
  async pay() {
    this.loaderShow = true;
    await this.stripe.confirmCardPayment(
      this.clientSecret, {
      payment_method: {
        card: this.cardElement
      }
    }
    ).then((data: any) => {
      console.log(data);
      if (data.paymentIntent && data.paymentIntent.status == "succeeded") {
        this.toast.success("Money added successfully.")
        this.loaderShow = false;
        this.getAllTransaction()
        this.modalService.dismissAll();
      } else {
        this.toast.success("Opps! There is some issue adding money , please try again after sometime!.")
        this.loaderShow = false;
        this.modalService.dismissAll();
      }
    }, (error: any) => {
      this.loaderShow = false;
      this.modalService.dismissAll();
      console.log("pay error", error)
      this.toast.error(error);
    })
  }
  /**
   * clcik on + and open input box
   */
  clickToAdd() {
    this.inputbox = true;
  }
  /**
   * change event of amount entered
   * @param event 
   */
  money(event: any) {
    this.mPaymentIntentRequest.amount = event.target.value;
    console.log("event", this.mPaymentIntentRequest.amount)
  }
  /**
   * api to get all transactions and total balance
   */
  getAllTransaction() {
    this.loaderShow = true;
    this.mWalletTransactionRequest.user_id = window.localStorage.getItem("id")
    this.mWalletTransactionRequest.user_type_id = this.profile.user_type_id;
    this.wsWallet.getTransaction(this.mWalletTransactionRequest).toPromise().then(resTransact => {
      if (resTransact && resTransact.status == 200) {
        this.loaderShow = false;
        this.MWalletTransactionResponse.balance = resTransact.balance;
        this.MWalletTransactionResponse.transactions = resTransact.transactions;
      } else {
        this.loaderShow = false;
        this.toast.error("Something went wrong!");
      }
    }, error => {
      this.loaderShow = false;
      console.log("getTransaction error", error)
      this.toast.error(error);
    })
  }

}
