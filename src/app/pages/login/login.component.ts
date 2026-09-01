import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WsLoginService } from '../../ws/wsLogin/ws-login.service';
import { MLoginRequest, MLoginResponse, MLoginResponseData } from './login.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormgroup: FormGroup;
  email: any;
  password: any;
  mloginReq: MLoginRequest = new MLoginRequest();
  mloginRes: MLoginResponse = new MLoginResponse();
  mLoginResponseData: MLoginResponseData = new MLoginResponseData();
  loaderShow: boolean = false;
  keepSigned: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private wsLogin: WsLoginService, private toast: ToastrService) {

    this.loginFormgroup = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  /**
   * Button click to redirect Signup page
   */
  goToSignup() {
    this.router.navigate(["signup"])
  }

  /**
   * button click to login the user after inputing credentials
   */
  login() {
    this.loaderShow = true;
    this.mloginReq.email = this.loginFormgroup.controls.email.value;
    this.mloginReq.password = this.loginFormgroup.controls.password.value
    console.log("emailpass", this.mloginReq.email, this.mloginReq.password)
    console.log("emailpass1", this.email, this.password)
    if (this.mloginReq.email == "" || this.mloginReq.email == undefined) {
      this.toast.error("Please enter Username or Email!");
      this.loaderShow = false;
    } else if (this.mloginReq.password == "" || this.mloginReq.password == undefined) {
      this.toast.error("Please enter Password!");
      this.loaderShow = false;
    } else {
      this.wsLogin.userLogin(this.mloginReq).toPromise().then(response => {
        console.log("login response : ", response)
        if (response && response.status) {
          this.toast.success(response.message);
          if (this.keepSigned == true) {
            window.localStorage.setItem("keepSigned", "1");
          } else {
            window.localStorage.setItem("keepSigned", "");
          }
          this.mLoginResponseData.id = response.data[0].id;
          this.mLoginResponseData.user_type_id = response.data[0].user_type_id;
          window.localStorage.setItem("auth", response.token)
          window.localStorage.setItem("id", this.mLoginResponseData.id.toString())
          window.localStorage.setItem("profile", this.mLoginResponseData.profile_image)
          window.localStorage.setItem("profiledata", JSON.stringify(response.data[0]))
          window.localStorage.setItem('user_type_id', this.mLoginResponseData.user_type_id.toString())
          console.log(window.localStorage.getItem("profiledata"))
          setTimeout(() => {
            this.loaderShow = false;
            this.router.navigate(["home"])
          }, 2000);
        } else {
          this.loaderShow = false;
          this.toast.error(response.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("login response error: ", error)
        this.toast.error(error.error.error);
      })
    }
  }

  /**
   * click to go to Forgot password page
   */
  goToForgotPassword() {
    this.router.navigate(["forgotpassword"])
  }
  /**
   * keepSignedIn used to set keepSignedIn true or false
   * @param e 
   */
  keepSignedIn(e: any) {
    console.log(e)
    this.keepSigned = e.target.checked;

  }

}
