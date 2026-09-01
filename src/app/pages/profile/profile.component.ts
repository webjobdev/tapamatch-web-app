import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WsProfileService } from 'src/app/ws/wsProfile/ws-profile.service';
import { MActivitiesResponse, MAddClubRequest, MBlockedResponse, MBlockUnblockUserRequest, MDeleteClubRequest, MSportsResponse, MUpdateProfileRequest } from './profile.module';
import { MHomePostResponse } from '../home/home.module'
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WsSignupService } from 'src/app/ws/wsSignup/ws-signup.service';
import { MGetCitiesRequest, MGetCitiesResponse, MGetCountriesResponse, MGetUserTypeResponse } from '../signup/signup.module';
import * as _ from 'lodash';
import { NavigationEnd, Router } from '@angular/router';
import { WsMembersService } from 'src/app/ws/wsMembers/ws-members.service';
import { MUserListResponse } from '../members/members/members.module';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: any = '';
  profile: any;
  mSportsResponse: MSportsResponse = new MSportsResponse();
  mActivitiesResponse: MActivitiesResponse = new MActivitiesResponse();
  mBlockedResponse: MBlockedResponse = new MBlockedResponse();
  mHomePostResponse: MHomePostResponse = new MHomePostResponse();
  mAddClubRequest: MAddClubRequest = new MAddClubRequest();
  mDeleteClubRequest: MDeleteClubRequest = new MDeleteClubRequest();
  mGetUserTypeRes: MGetUserTypeResponse = new MGetUserTypeResponse();
  mGetCountriesRes: MGetCountriesResponse = new MGetCountriesResponse();
  mGetCitiesReq: MGetCitiesRequest = new MGetCitiesRequest();
  mGetCitiesRes: MGetCitiesResponse = new MGetCitiesResponse();
  mUpdateProfileRequest: MUpdateProfileRequest = new MUpdateProfileRequest();
  mUserListResponse: MUserListResponse = new MUserListResponse();
  mBlockUnblockUserRequest: MBlockUnblockUserRequest = new MBlockUnblockUserRequest();
  deleteClub: boolean = false;
  closeResult: any;
  deleteClubId: any;
  addClubFormgroup: FormGroup;
  updateProfileFormgroup: FormGroup;
  priPubFormGroup: FormGroup;
  addClub: boolean = false;
  editP: boolean = false;
  imageError: string = '';
  imgView: any;
  imageset: any;
  checkedSports: any = '';
  checkedActivity: any = '';
  banner_image: any;
  bannerimg: boolean = false;
  loaderShow: boolean = true;
  checkedSportList: any;
  statpripub: any;
  user_id: any;
  description: any;
  blockuser: boolean = false;
  login_id: any;
  showButton: any;
  constructor(private wsMember: WsMembersService, private router: Router, private wsSignup: WsSignupService, private wsProfile: WsProfileService, private toast: ToastrService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.addClubFormgroup = this.formBuilder.group({
      name: [''],
      location: [''],
      city: ['']
    });
    this.updateProfileFormgroup = this.formBuilder.group({
      userType: [''],
      fname: [''],
      lname: [''],
      country: [''],
      city: [''],
      image: ['']
    });
    this.priPubFormGroup = this.formBuilder.group({
      pripub: ['']
    });
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        console.log("url", evt.url);
        window.localStorage.setItem("u_id", evt.url.split("/")[2])
      }
    });

  }

  ngOnInit(): void {
    this.loaderShow = true;
    this.user_id = window.localStorage.getItem("u_id");

    console.log("idnvdisvn", this.user_id)
    if (this.user_id == 'undefined' || this.user_id == undefined) {
      this.profileData = window.localStorage.getItem("profiledata")
      console.log(JSON.parse(this.profileData))
      this.profile = JSON.parse(this.profileData);
      console.log("got profil", this.profile)
      this.setSportActivity()
    } else {
      this.wsMember.getUsers(this.user_id).toPromise().then(resUser => {
        if (resUser && resUser.status) {
          this.profile = resUser.data[0];
          console.log(this.profile.id)
          this.login_id = window.localStorage.getItem("id")
          if (this.profile.id != parseInt(this.login_id, 10) && this.profile.request_receive && this.profile.request_receive.length > 0) {
            const friend = this.profile.request_receive.findIndex((t: any) => t.user_id === parseInt(this.login_id, 10));
            console.log("friend", friend)
            if (friend > -1) {
              if (this.profile.request_receive[friend].approved == 'pending') {
                this.showButton = "Request Sent"
              }
              else {
                this.showButton = "UnFriend"
              }
            }
            else if (friend == -1) {
              this.showButton = "Add Friend"
            }
          }
          this.setSportActivity();
        } else {
          this.toast.error(resUser.message);
        }
      }, error => {
        console.log("getUsers error", error)
        this.toast.error(error?.error?.message);
      })
    }

    this.wsProfile.getSportList().toPromise().then(resSport => {
      if (resSport && resSport.status) {
        this.mSportsResponse.data = resSport.data;
      } else {
        this.mSportsResponse.data = resSport.data;
        this.toast.error(resSport.message);
      }
    }, error => {
      console.log("getSportList error", error)
      this.toast.error(error?.error?.message);
    })
    this.wsProfile.getActivityList().toPromise().then(resActivity => {
      if (resActivity && resActivity.status) {
        this.mActivitiesResponse.data = resActivity.data;
      } else {
        this.mActivitiesResponse.data = resActivity.data;
        this.toast.error(resActivity.msg);
      }
    }, error => {
      console.log("getActivityList error", error)
      this.toast.error(error?.error?.message);
    })
    this.wsProfile.getBlockList().toPromise().then(resBlock => {
      if (resBlock && resBlock.status) {
        this.mBlockedResponse.data = resBlock.data;
      } else {
        this.mBlockedResponse.data = resBlock.data;
      }
    }, error => {
      console.log("getBlockList error", error)
      this.toast.error(error?.error?.message);
    })
    this.loaderShow = false;
  }
  /**
   * set sports and activity checkbox
   */
  setSportActivity() {
    console.log(this.profile)
    this.checkedSports = '';
    this.checkedActivity = '';
    if (this.profile?.sports != null) {
      if (this.profile.sports.length > 0) {
        this.checkedSports = this.profile.sports.map((x: any) => x.id).join(",");
      }
    }
    this.checkedSports = "," + this.checkedSports + ",";
    console.log("checkedSports", this.checkedSports)

    if (this.profile?.activity != null) {
      if (this.profile.activity.length > 0) {
        this.checkedActivity = this.profile.activity.map((x: any) => x.id).join(",");
      }
    }
    this.checkedActivity = "," + this.checkedActivity + ",";
    console.log("checkedActivity", this.checkedActivity)
  }
  /**
   * get user posts
   */
  openPosts() {
    this.loaderShow = true;
    this.wsProfile.getUserPosts("1").toPromise().then(resPosts => {
      if (resPosts && resPosts.data) {
        this.loaderShow = false;
        // this.toast.success("Posts Show Successfully");
        this.mHomePostResponse.data = resPosts.data;
      } else {
        this.loaderShow = false;
        this.toast.error("Something went Wrong!");
      }
    }, error => {
      this.loaderShow = false;
      console.log("getPosts error", error)
      this.toast.error(error?.error?.message);
    })
  }

  /**
   * click to open delete club modal
   * @param content 
   * @param clubId 
   */
  deleteClubs(content: any, clubId: any) {
    this.deleteClubId = clubId;
    this.deleteClub = true;
    console.log("content", content)
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
  }
  /**
   * click to open change banner image modal
   * @param content 
   * @param banner 
   */
  changeBannerModal(content: any, banner: any) {
    this.banner_image = banner;
    this.bannerimg = true;
    console.log("content", content)
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
  }

  /**
   * dismiss all existing modals
   * @param reason 
   * @returns 
   */
  getDismissReason(reason: any): string {
    this.addClub = false;
    this.bannerimg = false;
    this.deleteClub = false;
    this.editP = false;
    this.blockuser = false;
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
   * confirm button to delete club
   */
  confirm() {
    console.log(this.deleteClubId)
    this.loaderShow = true;
    this.mDeleteClubRequest.id = this.deleteClubId;
    this.wsProfile.removeClub(this.mDeleteClubRequest).toPromise().then(clubRes => {
      if (clubRes && clubRes.status) {
        this.deleteClub = false;
        this.modalService.dismissAll()
        this.toast.success(clubRes.message);
        window.localStorage.setItem("profiledata", JSON.stringify(clubRes.data))
        this.profileData = window.localStorage.getItem('profiledata');
        this.profile = JSON.parse(this.profileData);
        console.log(this.profile)
        this.checkedSports = '';
        this.checkedActivity = '';
        if (this.profile.sports != null) {
          if (this.profile.sports.length > 0) {
            this.checkedSports = this.profile.sports.map((x: any) => x.id).join(",");
          }
        }
        this.checkedSports = "," + this.checkedSports + ",";
        console.log("checkedSports", this.checkedSports)
        if (this.profile.activity != null) {
          if (this.profile.activity.length > 0) {
            this.checkedActivity = this.profile.activity.map((x: any) => x.id).join(",");
          }
        }
        this.checkedActivity = "," + this.checkedActivity + ",";
        console.log("checkedActivity", this.checkedActivity)

        this.loaderShow = false;

      } else {
        this.loaderShow = false;
        this.toast.error(clubRes.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("createPost error", error)
      this.toast.error(error?.error?.message);
    })

  }

  /**
   * click to open new create club modal
   * @param content 
   */
  addNewClub(content: any) {
    this.addClub = true;
    console.log("content", content)
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
  }
  /**
   * api to create new club 
   */
  saveClub() {
    console.log("this.createPostForm.controls.content.value", this.addClubFormgroup.controls.name.value)
    if (this.addClubFormgroup.controls.name.value == "") {
      this.toast.error("Please enter Name!")
      this.modalService.hasOpenModals();
    } else if (this.addClubFormgroup.controls.location.value == "") {
      this.toast.error("Please enter Location!")
      this.modalService.hasOpenModals();
    } else if (this.addClubFormgroup.controls.city.value == "") {
      this.toast.error("Please enter City!")
      this.modalService.hasOpenModals();
    } else {
      this.loaderShow = true;
      console.log("done")
      this.mAddClubRequest.name = this.addClubFormgroup.controls.name.value;
      this.mAddClubRequest.location = this.addClubFormgroup.controls.location.value;
      this.mAddClubRequest.city = this.addClubFormgroup.controls.city.value;

      this.wsProfile.createClub(this.mAddClubRequest).toPromise().then(clubRes => {
        if (clubRes && clubRes.status) {
          this.addClub = false;
          this.modalService.dismissAll()
          this.toast.success(clubRes.message);
          window.localStorage.setItem("profiledata", JSON.stringify(clubRes.data))
          this.profileData = window.localStorage.getItem('profiledata');
          this.profile = JSON.parse(this.profileData);
          this.checkedSports = '';
          this.checkedActivity = '';
          if (this.profile.sports != null) {
            if (this.profile.sports.length > 0) {
              this.checkedSports = this.profile.sports.map((x: any) => x.id).join(",");
            }
          }
          this.checkedSports = "," + this.checkedSports + ",";
          console.log("checkedSports", this.checkedSports)
          if (this.profile.activity != null) {
            if (this.profile.activity.length > 0) {
              this.checkedActivity = this.profile.activity.map((x: any) => x.id).join(",");
            }
          }
          this.checkedActivity = "," + this.checkedActivity + ",";
          console.log("checkedActivity", this.checkedActivity)

          console.log(this.profile)

          this.loaderShow = false;
        } else {
          this.loaderShow = false;
          this.toast.error(clubRes.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("createPost error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * click to open update profile page modal
   * @param content 
   */
  editProfile(content: any) {
    this.editP = true;

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
    this.updateProfileFormgroup.controls.fname.setValue(this.profile.fname)
    this.updateProfileFormgroup.controls.lname.setValue(this.profile.lname)
    this.updateProfileFormgroup.controls.userType.setValue(this.profile.user_type_id)
    this.updateProfileFormgroup.controls.country.setValue(this.profile.country)
    this.mGetCitiesReq.country_id = this.profile.country;
    this.wsSignup.getCities(this.mGetCitiesReq).toPromise().then(resCities => {
      if (resCities && resCities.status) {
        this.mGetCitiesRes.data = resCities.data;
        this.updateProfileFormgroup.controls.city.setValue(this.profile.city)
      } else {
        this.toast.error(resCities.message);
      }
    }, error => {
      console.log("getCities error", error)
      this.toast.error(error);
    })

    console.log("content", content)
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
  }
  /**
   * select country click
   */
  selectCountry() {
    this.loaderShow = true;
    console.log(this.updateProfileFormgroup.controls.country.value)
    this.mGetCitiesReq.country_id = this.updateProfileFormgroup.controls.country.value;
    /**
     * Get list of cities
     */
    this.wsSignup.getCities(this.mGetCitiesReq).toPromise().then(resCities => {
      if (resCities && resCities.status) {
        this.loaderShow = false;
        this.mGetCitiesRes.data = resCities.data;
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
   * api to update profile / banner image 
   * @param fileInput 
   * @param type 
   */
  preview(fileInput: any, type: any) {
    this.loaderShow = true;
    this.imageError = '';
    this.imageset = fileInput.target.files[0]
    if (type == "profile") {
      this.mUpdateProfileRequest.profile_image = this.imageset;
    } else {
      this.mUpdateProfileRequest.banner_image = this.imageset;
    }
    this.wsProfile.updateProfile(this.mUpdateProfileRequest).toPromise().then(response => {
      console.log("updateProfile response : ", response)
      if (response && response.status) {
        if (type == "banner") {
          this.modalService.dismissAll();
          this.bannerimg = false;
        }
        window.localStorage.setItem("profiledata", JSON.stringify(response.data))
        this.profileData = window.localStorage.getItem('profiledata');
        this.profile = JSON.parse(this.profileData);
        this.checkedSports = '';
        this.checkedActivity = '';
        if (this.profile.sports != null) {
          if (this.profile.sports.length > 0) {
            this.checkedSports = this.profile.sports.map((x: any) => x.id).join(",");
          }
        }
        this.checkedSports = "," + this.checkedSports + ",";
        console.log("checkedSports", this.checkedSports)
        if (this.profile.activity != null) {
          if (this.profile.activity.length > 0) {
            this.checkedActivity = this.profile.activity.map((x: any) => x.id).join(",");
          }
        }
        this.checkedActivity = "," + this.checkedActivity + ",";
        console.log("checkedActivity", this.checkedActivity)
        this.loaderShow = false;
        this.toast.success(response.message);
      } else {
        this.loaderShow = false;
        this.toast.error(response.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateProfile response error: ", error)
      this.toast.error(error);
    })
    if (fileInput.target.files && fileInput.target.files[0]) {
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
   * api to update profile with specific fields
   */
  updatePro() {
    console.log(this.updateProfileFormgroup)
    this.mUpdateProfileRequest.user_type_id = this.updateProfileFormgroup.controls.userType.value;
    this.mUpdateProfileRequest.fname = this.updateProfileFormgroup.controls.fname.value;
    this.mUpdateProfileRequest.lname = this.updateProfileFormgroup.controls.lname.value;
    this.mUpdateProfileRequest.country = this.updateProfileFormgroup.controls.country.value;
    this.mUpdateProfileRequest.city = this.updateProfileFormgroup.controls.city.value;

    console.log(this.mUpdateProfileRequest)
    if (this.mUpdateProfileRequest.user_type_id.toString() == "") {
      this.toast.error("Please Select User Type!");
      this.modalService.hasOpenModals();
    } else if (this.mUpdateProfileRequest.fname == "") {
      this.toast.error("Please Enter First Name!");
      this.modalService.hasOpenModals();
    } else if (this.mUpdateProfileRequest.lname == "") {
      this.toast.error("Please Enter Last Name!");
      this.modalService.hasOpenModals();
    } else if (this.mUpdateProfileRequest.country.toString() == "") {
      this.toast.error("Please Select Country!");
      this.modalService.hasOpenModals();
    } else if (this.mUpdateProfileRequest.city.toString() == "") {
      this.toast.error("Please Select City!");
      this.modalService.hasOpenModals();
    } else {
      this.loaderShow = true;
      this.wsProfile.updateProfile(this.mUpdateProfileRequest).toPromise().then(response => {
        console.log("updateProfile response : ", response)
        if (response && response.status) {
          this.editP = false;
          this.modalService.dismissAll()
          window.localStorage.setItem("profiledata", JSON.stringify(response.data))
          this.profileData = window.localStorage.getItem('profiledata');
          this.profile = JSON.parse(this.profileData);
          this.checkedSports = '';
          this.checkedActivity = '';
          if (this.profile.sports != null) {
            if (this.profile.sports.length > 0) {
              this.checkedSports = this.profile.sports.map((x: any) => x.id).join(",");
            }
          }
          this.checkedSports = "," + this.checkedSports + ",";
          console.log("checkedSports", this.checkedSports)
          if (this.profile.activity != null) {
            if (this.profile.activity.length > 0) {
              this.checkedActivity = this.profile.activity.map((x: any) => x.id).join(",");
            }
          }
          this.checkedActivity = "," + this.checkedActivity + ",";
          console.log("checkedActivity", this.checkedActivity)

          this.loaderShow = false;
          this.toast.success(response.message);

        } else {
          this.loaderShow = false;
          this.toast.error(response.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("updateProfile response error: ", error)
        this.toast.error(error);
      })
    }
  }
  /**
   * check specific sports checked
   * @param event 
   * @param sport 
   */
  checkSportsAvailable(event: any, sport: any) {
    console.log(event.target.checked)
    console.log(sport)
    if (this.profile.sports == null) {
      this.profile.sports = [];
    }
    if (event.target.checked == true) {
      this.profile.sports.push(sport);
      console.log("true", this.profile.sports)
    } else {

      for (var i = 0; i < this.profile.sports.length; i++) {
        if (this.profile.sports[i].id == sport.id) {
          this.profile.sports.splice(i, 1);
        }
      }
      console.log("false", this.profile.sports)

    }
    this.mUpdateProfileRequest.sports = this.profile.sports.map((x: any) => x.id).join(",")
  }
  /**
   * check specific activities checked
   */
  checkActivityAvailable(event: any, activity: any) {
    console.log(event.target.checked)
    console.log(activity)
    if (this.profile.activity == null) {
      this.profile.activity = [];
    }
    if (event.target.checked == true) {
      this.profile.activity.push(activity);
      console.log("true", this.profile.activity)
    } else {

      for (var i = 0; i < this.profile.activity.length; i++) {
        if (this.profile.activity[i].id == activity.id) {
          this.profile.activity.splice(i, 1);
        }
      }
      console.log("false", this.profile.activity)

    }
    this.mUpdateProfileRequest.activity = this.profile.activity.map((x: any) => x.id).join(",")
  }
  /**
   * api call to save sports and activity update in api using save button
   */
  saveSportActivity() {
    this.loaderShow = true;
    this.mUpdateProfileRequest.banner_description = this.description;
    this.wsProfile.updateProfile(this.mUpdateProfileRequest).toPromise().then(response => {
      console.log("updateProfile response : ", response)
      if (response && response.status) {
        window.localStorage.setItem("profiledata", JSON.stringify(response.data))
        this.profileData = window.localStorage.getItem('profiledata');
        this.profile = JSON.parse(this.profileData);
        this.checkedSports = '';
        this.checkedActivity = '';
        if (this.profile.sports != null) {
          if (this.profile.sports.length > 0) {
            this.checkedSports = this.profile.sports.map((x: any) => x.id).join(",");
          }
        }
        this.checkedSports = "," + this.checkedSports + ",";
        console.log("checkedSports", this.checkedSports)
        if (this.profile.activity != null) {
          if (this.profile.activity.length > 0) {
            this.checkedActivity = this.profile.activity.map((x: any) => x.id).join(",");
          }
        }
        this.checkedActivity = "," + this.checkedActivity + ",";
        console.log("checkedActivity", this.checkedActivity)
        this.loaderShow = false;
        this.toast.success(response.message);

      } else {
        this.loaderShow = false;
        this.toast.error(response.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateProfile response error: ", error)
      this.toast.error(error);
    })
  }
  /**
   * routing to view friends page
   */
  friends() {
    this.router.navigate(["/members/friends"])
  }
  /**
   * changes event of description
   * @param evt 
   */
  changeDescription(evt: any) {
    console.log(evt)
    this.description = evt.target.value;
  }
  /**
   * api call to unfriend user
   */
  unFriend(element: any, id: any) {
    this.loaderShow = true;
    element.textContent = "Add Friend";
    element.disabled = true;
    this.wsProfile.unfriendUser(id).toPromise().then(response => {
      console.log("updateProfile response : ", response)
      this.loaderShow = false;
      this.friends();
    }, error => {
      console.log("updateProfile response error: ", error)
      this.toast.error(error);
    })
  }

  /**open modal to confirm block user
   * 
   * @param content 
   */
  confirmBlockUser(content: any) {
    this.blockuser = true;
    console.log("content", content)
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
  }
  /**
   * api to block and unblock user  
   */
  blockUnblockUser(value: any, id?: any) {
    this.loaderShow = true;
    if (id) {
      this.mBlockUnblockUserRequest.other_user_id = id;
    } else {
      this.mBlockUnblockUserRequest.other_user_id = this.profile.id;
    }
    this.mBlockUnblockUserRequest.status = value;
    this.wsProfile.blockUnblock(this.mBlockUnblockUserRequest).toPromise().then(response => {
      console.log("blockUnblock response : ", response)
      if (response.status) {
        this.toast.success(response.message)
        this.loaderShow = false;
        if (id) {
          this.wsProfile.getBlockList().toPromise().then(resBlock => {
            if (resBlock && resBlock.status) {
              this.mBlockedResponse.data = resBlock.data;
            } else {
              this.mBlockedResponse.data = resBlock.data;
              this.toast.error(resBlock.message);
            }
          }, error => {
            console.log("getBlockList error", error)
            this.toast.error(error?.error?.message);
          })
        } else {
          this.friends();
        }
      } else {
        this.toast.error(response.message)
        this.loaderShow = false;
      }
    }, error => {
      console.log("blockUnblock response error: ", error)
      this.toast.error(error);
      this.loaderShow = false;
    })
  }
  /**
   * privatePublic set profile private / public
   * @param event 
   */
  privatePublic(event: any) {
    var status;
    if (event.target.checked == true) {
      status = 1
    } else {
      status = 0
    }
    this.wsProfile.privatePublic(status).toPromise().then(response => {
      console.log("privatePublic response : ", response)
      if (response && response.status) {
        window.localStorage.setItem("profiledata", JSON.stringify(response.data))
        this.profileData = window.localStorage.getItem('profiledata');
        this.profile = JSON.parse(this.profileData);
        this.checkedSports = '';
        this.checkedActivity = '';
        if (this.profile.sports != null) {
          if (this.profile.sports.length > 0) {
            this.checkedSports = this.profile.sports.map((x: any) => x.id).join(",");
          }
        }
        this.checkedSports = "," + this.checkedSports + ",";
        console.log("checkedSports", this.checkedSports)
        if (this.profile.activity != null) {
          if (this.profile.activity.length > 0) {
            this.checkedActivity = this.profile.activity.map((x: any) => x.id).join(",");
          }
        }
        this.checkedActivity = "," + this.checkedActivity + ",";
        console.log("checkedActivity", this.checkedActivity)
        this.toast.success(response.message);

      } else {
        this.toast.error(response.message);
      }
    }, error => {
      console.log("privatePublic response error: ", error)
      this.toast.error(error);
    })

  }

  /**
   * Api to add new friend by sending request
   * @param element 
   * @param receiverId 
   */
  addNextFriend(element: any, receiverId: any) {
    this.loaderShow = true;
    element.textContent = "Request Sent";
    element.disabled = true;
    console.log("receiverId", receiverId);
    this.wsMember.addFriend(receiverId).toPromise().then(resAddFriend => {
      if (resAddFriend && resAddFriend.status == 200) {
        this.toast.success(resAddFriend.message);
        this.wsMember.getUsers().toPromise().then(resUsers => {
          if (resUsers && resUsers.status) {
            this.loaderShow = false;
            this.mUserListResponse.data = resUsers.data;
          } else {
            this.loaderShow = false;
            this.toast.error(resUsers.message);
          }
        }, error => {
          this.loaderShow = false;
          console.log("getUsers error", error)
          this.toast.error(error?.error?.message);
        })
      } else {
        this.loaderShow = false;
        this.toast.error(resAddFriend.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("addNextFriend error", error)
      this.toast.error(error?.error?.message);
    })
  }

}
