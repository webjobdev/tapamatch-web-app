import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WsSignupService } from '../../ws/wsSignup/ws-signup.service';
import { MGetCitiesRequest, MGetCitiesResponse, MGetCountriesResponse, MGetUserTypeResponse, MSignUpRequest, MSignUpResponse } from './signup.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpFormgroup: FormGroup;
  imgView!: string;
  imageError!: string;
  mGetUserTypeRes: MGetUserTypeResponse = new MGetUserTypeResponse();
  mGetCountriesRes: MGetCountriesResponse = new MGetCountriesResponse();
  mGetCitiesReq: MGetCitiesRequest = new MGetCitiesRequest();
  mGetCitiesRes: MGetCitiesResponse = new MGetCitiesResponse();
  mSignUpRes: MSignUpResponse = new MSignUpResponse();
  mSignUpReq: MSignUpRequest = new MSignUpRequest();
  userTypes = [];
  loaderShow: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private wsSignup: WsSignupService, private toast: ToastrService) {

    this.signUpFormgroup = this.formBuilder.group({
      userType: [''],
      fname: [''],
      lname: [''],
      phone: [''],
      gender: [''],
      dob: [''],
      country: [''],
      city: [''],
      uname: [''],
      email: [''],
      password: [''],
      cpassword: [''],
      image: ['']
    });
    this.signUpFormgroup.controls['userType'].setValue("")
    this.signUpFormgroup.controls['country'].setValue("")
    this.signUpFormgroup.controls['city'].setValue("")
    this.signUpFormgroup.controls['gender'].setValue("")
    var today = moment().format('YYYY-MM-DD');
    this.signUpFormgroup.controls['dob'].setValue(today)
    this.imgView = "../../../assets/images/Gender.png"

    /**
     * Get list of userType
     */
    this.wsSignup.getUserType().toPromise().then(resUserType => {
      if (resUserType && resUserType.status) {
        this.mGetUserTypeRes.data = resUserType.data;
      } else {
        this.toast.error(resUserType.message);
      }
    }, error => {
      console.log("getUserType error", error)
      this.toast.error(error);
    })
    /**
         * Get list of Countries
         */
    this.wsSignup.getCountries().toPromise().then(resCountries => {
      if (resCountries && resCountries.status) {
        this.mGetCountriesRes.data = resCountries.data;
      } else {
        this.toast.error(resCountries.message);
      }
    }, error => {
      console.log("getcountries error", error)
      this.toast.error(error);
    })
  }

  ngOnInit(): void {
  }

  /**
   * Button click to go to login page
   */
  goToLogin() {
    this.router.navigate(["/login"])
  }
  /**
   * on change function to select files and preview in UI
   * @param fileInput 
   * @returns 
   */
  preview(fileInput: any) {
    this.imageError = '';
    this.signUpFormgroup.controls.image.setValue(fileInput.target.files[0])
    if (fileInput.target.files && fileInput.target.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg'];
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.imgView = imgBase64Path;
          console.log("base64", this.imgView)
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  /**
   * on change function to select country and get list of cities as per country_id
   */
  selectCountry() {
    console.log(this.signUpFormgroup.controls.country.value)
    this.mGetCitiesReq.country_id = this.signUpFormgroup.controls.country.value;
    /**
     * Get list of cities
     */
    this.loaderShow = true;
    this.wsSignup.getCities(this.mGetCitiesReq).toPromise().then(resCities => {
      if (resCities && resCities.status) {
        this.mGetCitiesRes.data = resCities.data;
        this.loaderShow = false;
      } else {
        this.loaderShow = false;
        this.toast.error(resCities.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("getCities error", error)
      this.toast.error(error);
    })
  }

  /**
   * Signup button click function and input validations function
   * Api to register a new user
   */
  signUp() {
    this.loaderShow = true;
    console.log(this.signUpFormgroup)
    this.mSignUpReq.user_type_id = this.signUpFormgroup.controls.userType.value;
    this.mSignUpReq.fname = this.signUpFormgroup.controls.fname.value;
    this.mSignUpReq.lname = this.signUpFormgroup.controls.lname.value;
    this.mSignUpReq.phone = this.signUpFormgroup.controls.phone.value;
    this.mSignUpReq.dob = this.signUpFormgroup.controls.dob.value;
    this.mSignUpReq.gender = this.signUpFormgroup.controls.gender.value;
    this.mSignUpReq.country = this.signUpFormgroup.controls.country.value;
    this.mSignUpReq.city = this.signUpFormgroup.controls.city.value;
    this.mSignUpReq.uname = this.signUpFormgroup.controls.uname.value;
    this.mSignUpReq.email = this.signUpFormgroup.controls.email.value;
    this.mSignUpReq.password = this.signUpFormgroup.controls.password.value;
    this.mSignUpReq.c_password = this.signUpFormgroup.controls.cpassword.value;
    this.mSignUpReq.profile_image = this.signUpFormgroup.controls.image.value;
    console.log(this.mSignUpReq)
    if (this.mSignUpReq.user_type_id.toString() == "") {
      this.loaderShow = false;
      this.toast.error("Please Select User Type!");
    } else if (this.mSignUpReq.fname == "") {
      this.loaderShow = false;
      this.toast.error("Please Enter First Name!");
    } else if (this.mSignUpReq.lname == "") {
      this.loaderShow = false;
      this.toast.error("Please Enter Last Name!");
    } else if (this.mSignUpReq.phone.toString() == "") {
      this.loaderShow = false;
      this.toast.error("Please Enter phone!");
    } else if (this.mSignUpReq.dob == "") {
      this.loaderShow = false;
      this.toast.error("Please Select Date of Birth!");
    } else if (this.mSignUpReq.gender == "") {
      this.loaderShow = false;
      this.toast.error("Please Select Gender!");
    } else if (this.mSignUpReq.country.toString() == "") {
      this.loaderShow = false;
      this.toast.error("Please Select Country!");
    } else if (this.mSignUpReq.city.toString() == "") {
      this.loaderShow = false;
      this.toast.error("Please Select City!");
    } else if (this.mSignUpReq.uname == "") {
      this.loaderShow = false;
      this.toast.error("Please Enter Username!");
    } else if (this.mSignUpReq.email == "") {
      this.loaderShow = false;
      this.toast.error("Please Enter Email!");
    } else if (this.mSignUpReq.password == "") {
      this.loaderShow = false;
      this.toast.error("Please Enter Password!");
    } else if (this.mSignUpReq.c_password == "") {
      this.loaderShow = false;
      this.toast.error("Please Enter Confirm Password!");
    } else if (this.mSignUpReq.c_password != this.mSignUpReq.password) {
      this.loaderShow = false;
      this.toast.error("Confirm Password should match with Password!");
    } else {
      this.wsSignup.userSignUp(this.mSignUpReq).toPromise().then(response => {
        console.log("signup response : ", response)
        if (response && (response.status == 'true' || response.status == true)) {
          this.loaderShow = false;
          this.toast.success(response.message);
          setTimeout(() => {
            this.goToLogin();
          }, 100);
        } else {
          this.loaderShow = false;
          this.toast.error(response.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("signup response error: ", error)
        this.toast.error(error);
      })
    }
  }
}
