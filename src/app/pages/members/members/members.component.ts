import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ToastrService } from 'ngx-toastr';
import { WsMembersService } from 'src/app/ws/wsMembers/ws-members.service';
import { WsProfileService } from 'src/app/ws/wsProfile/ws-profile.service';
import { WsSignupService } from 'src/app/ws/wsSignup/ws-signup.service';
import { MActivitiesResponse, MFriendListResponse, MFriendListResponseData, MSportsResponse } from '../../profile/profile.module';
import { MGetCitiesRequest, MGetCitiesResponse, MGetCountriesResponse, MGetUserTypeResponse } from '../../signup/signup.module';
import { MUserfilTerRequest, MUserListResponse } from './members.module';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  mUserListResponse: MUserListResponse = new MUserListResponse();
  searchMem: any;
  searchList: any = [];
  searchtoggle: boolean = false;
  closeResult: string = '';
  filterUserFormgroup: FormGroup;
  mSportsResponse: MSportsResponse = new MSportsResponse();
  mActivitiesResponse: MActivitiesResponse = new MActivitiesResponse();
  mGetUserTypeRes: MGetUserTypeResponse = new MGetUserTypeResponse();
  mGetCountriesRes: MGetCountriesResponse = new MGetCountriesResponse();
  mGetCitiesReq: MGetCitiesRequest = new MGetCitiesRequest();
  mGetCitiesRes: MGetCitiesResponse = new MGetCitiesResponse();
  mUserfilTerRequest: MUserfilTerRequest = new MUserfilTerRequest();
  mFriendListResponse: MFriendListResponse = new MFriendListResponse();
  friends: any;
  loaderShow: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private wsSignup: WsSignupService, private wsProfile: WsProfileService, private wsMember: WsMembersService, private toast: ToastrService, private modalService: NgbModal) {
    this.filterUserFormgroup = this.formBuilder.group({
      userType: [''],
      name: [''],
      gender: [''],
      country: [''],
      city: [''],
      uname: [''],
      sport: [''],
      activity: ['']
    });
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        console.log("url", evt.url);
        this.friends = evt.url.split("/")[2];
        window.localStorage.setItem("friend", this.friends)
        console.log(this.friends)
      }
    });
  }

  ngOnInit(): void {
    this.loaderShow = true;
    this.friends = window.localStorage.getItem("friend");
    if (window.localStorage.getItem("friend") == "friends") {
      /**
       * api to get all friends of current user
       */
      this.wsMember.getFriends().toPromise().then(resUsers => {
        if (resUsers && resUsers.status) {
          this.loaderShow = false;
          this.mFriendListResponse.data = resUsers.data;
        } else {
          this.loaderShow = false;
          this.toast.error(resUsers.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("getFriends error", error)
        this.toast.error(error?.error?.message);
      })
    } else {
      console.log("ng", this.friends)
      /**
       * api to get all members of app to send request 
       */
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
    }
  }
  /**
   * search bar match to search member
   * @param event 
   */
  searchMember(event: any) {
    this.searchtoggle = true;
    if (this.friends == "friends") {
      this.searchList = this.search(this.mFriendListResponse.data, event.target.value);
      console.log(this.searchList)
    } else {
      console.log(event.target.value)
      this.searchList = this.search(this.mUserListResponse.data, event.target.value);
      console.log(this.searchList)
    }
  }
  /**
   * filter search by fname , lname and combine (fname + lname)
   * @param source 
   * @param name 
   * @returns 
   */
  search(source: any, name: any) {
    var results = [];
    var index;
    var entry;

    name = name.toUpperCase();
    for (index = 0; index < source.length; ++index) {
      if (this.friends == "friends") {
        entry = source[index].user;
        let fullname = entry.fname + " " + entry.lname;
        if ((entry && entry.fname && entry.fname.toUpperCase().indexOf(name) !== -1) || (entry && entry.lname && entry.lname.toUpperCase().indexOf(name) !== -1) || (fullname.toUpperCase().indexOf(name) !== -1)) {
          results.push(source[index]);
        }
      } else {
        entry = source[index];
        let fullname = entry.fname + " " + entry.lname;
        if ((entry && entry.fname && entry.fname.toUpperCase().indexOf(name) !== -1) || (entry && entry.lname && entry.lname.toUpperCase().indexOf(name) !== -1) || (fullname.toUpperCase().indexOf(name) !== -1)) {
          results.push(entry);
        }
      }
    }
    return results;
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
  /**
   * click to clear all modal inputs
   */
  clearAll() {
    this.filterUserFormgroup.controls.sport.setValue('');
    this.filterUserFormgroup.controls.activity.setValue('');
    this.filterUserFormgroup.controls.gender.setValue('');
    this.filterUserFormgroup.controls.name.setValue('');
    this.filterUserFormgroup.controls.uname.setValue('');
    this.filterUserFormgroup.controls.country.setValue('');
    this.filterUserFormgroup.controls.city.setValue('');
    this.filterUserFormgroup.controls.userType.setValue('');
    this.modalService.hasOpenModals();
  }
  /**
   * filter modal to get open
   */
  filterModal(content: any) {
    console.log("content", content)
    this.wsProfile.getSportList().toPromise().then(resSport => {
      if (resSport && resSport.status) {
        this.mSportsResponse.data = resSport.data;
        setTimeout(() => {
          if (this.mUserfilTerRequest.sport_type) {
            this.filterUserFormgroup.controls.sport.setValue(this.mUserfilTerRequest.sport_type);
          } else {
            this.filterUserFormgroup.controls.sport.setValue('');
          }
        }, 200);
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
        setTimeout(() => {
          if (this.mUserfilTerRequest.activity_type) {
            this.filterUserFormgroup.controls.activity.setValue(this.mUserfilTerRequest.activity_type);
          } else {
            this.filterUserFormgroup.controls.activity.setValue('');
          }
        }, 200);
      } else {
        this.mActivitiesResponse.data = resActivity.data;
        this.toast.error(resActivity.msg);
      }
    }, error => {
      console.log("getActivityList error", error)
      this.toast.error(error?.error?.message);
    })
    this.wsSignup.getUserType().toPromise().then(resUserType => {
      if (resUserType && resUserType.status) {
        this.mGetUserTypeRes.data = resUserType.data;
        setTimeout(() => {
          if (this.mUserfilTerRequest.user_type) {
            this.filterUserFormgroup.controls.userType.setValue(this.mUserfilTerRequest.user_type);
          } else {
            this.filterUserFormgroup.controls.userType.setValue('');
          }
        }, 200);
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
        setTimeout(() => {
          if (this.mUserfilTerRequest.country) {
            this.filterUserFormgroup.controls.country.setValue(this.mUserfilTerRequest.country);
            this.mGetCitiesReq.country_id = this.mUserfilTerRequest.country
            this.wsSignup.getCities(this.mGetCitiesReq).toPromise().then(resCities => {
              if (resCities && resCities.status) {
                this.mGetCitiesRes.data = resCities.data;
                setTimeout(() => {
                  if (this.mUserfilTerRequest.city) {
                    this.filterUserFormgroup.controls.city.setValue(this.mUserfilTerRequest.city);
                  } else {
                    this.filterUserFormgroup.controls.city.setValue('');
                  }
                }, 200);
              } else {
                this.toast.error(resCities.message);
              }
            }, error => {
              console.log("getCities error", error)
              this.toast.error(error);
            })
          } else {
            this.filterUserFormgroup.controls.country.setValue('');
          }
        }, 200);
      } else {
        this.toast.error(resCountries.message);
      }
    }, error => {
      console.log("getcountries error", error)
      this.toast.error(error);
    })

    if (this.mUserfilTerRequest.name) {
      this.filterUserFormgroup.controls.name.setValue(this.mUserfilTerRequest.name);
    } else {
      this.filterUserFormgroup.controls.name.setValue('');
    }

    if (this.mUserfilTerRequest.username) {
      this.filterUserFormgroup.controls.uname.setValue(this.mUserfilTerRequest.username);
    } else {
      this.filterUserFormgroup.controls.uname.setValue('');
    }
    if (this.mUserfilTerRequest.gender) {
      this.filterUserFormgroup.controls.gender.setValue(this.mUserfilTerRequest.gender);
    } else {
      this.filterUserFormgroup.controls.gender.setValue('');
    }
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
    console.log(this.filterUserFormgroup.controls.country.value)
    this.mGetCitiesReq.country_id = this.filterUserFormgroup.controls.country.value;
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
   * dismiss existing modal
   * @param reason 
   * @returns 
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
   * filter members by specific filters
   */
  filterData() {
    this.loaderShow = true;
    this.searchtoggle = false;
    this.mUserfilTerRequest.username = this.filterUserFormgroup.controls.uname.value;
    this.mUserfilTerRequest.name = this.filterUserFormgroup.controls.name.value;
    this.mUserfilTerRequest.user_type = this.filterUserFormgroup.controls.userType.value;
    this.mUserfilTerRequest.activity_type = this.filterUserFormgroup.controls.activity.value;
    this.mUserfilTerRequest.sport_type = this.filterUserFormgroup.controls.sport.value;
    this.mUserfilTerRequest.country = this.filterUserFormgroup.controls.country.value;
    this.mUserfilTerRequest.city = this.filterUserFormgroup.controls.city.value;
    this.mUserfilTerRequest.gender = this.filterUserFormgroup.controls.gender.value;
    this.modalService.dismissAll();
    this.wsMember.getFilterUser(this.mUserfilTerRequest).toPromise().then(resUsers => {
      if (resUsers && resUsers.status) {
        this.loaderShow = false;
        this.toast.success(resUsers.message);
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
  }
  /**
   * view profile of selected member
   * @param id 
   */
  viewProfile(id: any) {
    this.router.navigate(["/profile/" + id])
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
  /**
   * goToChat used to go to chat page with user data
   * @param userDetails 
   */
  goToChat(userDetails: any) {
    console.log("userDetails11111", userDetails)
    const navigationExtras: NavigationExtras = {
      state: {
        username: userDetails.uname,
        image_profile: userDetails.profile_image,
        id: userDetails.id,
        other_user_id: userDetails.id
      },
    };
    this.router.navigate(["/chat/" + userDetails.id], { state: navigationExtras })
  }



}
