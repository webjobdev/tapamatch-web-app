import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WsForgotPasswordService } from 'src/app/ws/wsForgotPassword/ws-forgot-password.service';
import { MForgotPasswordRequest, MForgotPasswordResponse } from './forgot-password.module';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordFormgroup: FormGroup;
  mForgotPasswordReq: MForgotPasswordRequest = new MForgotPasswordRequest();
  mForgotPasswordRes: MForgotPasswordResponse = new MForgotPasswordResponse();
  loaderShow: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private toast: ToastrService, private wsForgotPassord: WsForgotPasswordService) {

    this.forgotPasswordFormgroup = this.formBuilder.group({
      email: ['']
    });
  }

  ngOnInit(): void {
  }

  /**
   * Send Click to send forgot passsword link on email
   * Api call for forgotpassword
   */
  forgotPassword() {
    this.mForgotPasswordReq.email = this.forgotPasswordFormgroup.controls.email.value;
    if (this.mForgotPasswordReq.email == "" || this.mForgotPasswordReq.email == undefined) {
      this.toast.error("Please enter Email!");
    } else {
      this.loaderShow = true;
      this.wsForgotPassord.userForgotPassword(this.mForgotPasswordReq).toPromise().then(response => {
        console.log("userForgotPassword response : ", response)
        if (response && response.status == 200) {
          this.loaderShow = false;
          this.toast.success(response.message);
          this.router.navigate(["login"]);
        } else {
          this.loaderShow = false;
          this.toast.error(response.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("userForgotPassword response error: ", error)
        this.toast.error(error);
      })
    }
  }

}
