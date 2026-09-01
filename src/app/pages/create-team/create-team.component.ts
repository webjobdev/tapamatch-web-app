import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WsHomeService } from 'src/app/ws/wsHome/ws-home.service';
import { WsProfileService } from 'src/app/ws/wsProfile/ws-profile.service';
import { MHomeUpcomingFriendlyResponse } from '../home/home.module';
import { MCreateEventRequest, MCreateTeamRequest } from '../list/list.module';
import { MFriendListResponse, MSportsResponse } from '../profile/profile.module';
import * as _ from 'lodash';
import { WsMembersService } from 'src/app/ws/wsMembers/ws-members.service';
import { WsListService } from 'src/app/ws/wslist/ws-list.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  createTeamFormgroup: FormGroup;
  mHomeUpcomingFriendlyResponse: MHomeUpcomingFriendlyResponse = new MHomeUpcomingFriendlyResponse();
  mCreateEventRequest: MCreateEventRequest = new MCreateEventRequest();
  mSportsResponse: MSportsResponse = new MSportsResponse();
  mFriendListResponse: MFriendListResponse = new MFriendListResponse();
  mCreateTeamRequest: MCreateTeamRequest = new MCreateTeamRequest();
  closeResult: any;
  searchtoggle: boolean = false;
  loaderShow: boolean = false;
  createFriendlyUser: boolean = false;
  createEventFriendly: boolean = false;
  title: any;
  searchFriendlyList: any = [];
  imageError: string = '';
  imgView: any;
  friendId: any;
  friendSelect: any = [];
  friend_name: any;
  searchFriendList: any = [];
  createFriendTeam: boolean = false;
  update: boolean = false;
  state: any
  teamId: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private wsList: WsListService, private wsMember: WsMembersService, private wsHome: WsHomeService, private modalService: NgbModal, private formBuilder: FormBuilder, private toast: ToastrService, private wsProfile: WsProfileService) {
    this.createTeamFormgroup = this.formBuilder.group({
      sport: [''],
      description: [''],
      friend: [''],
      title: [''],
      image: [''],
      gender: ['']
    });
    this.imgView = '../../../assets/images/camera1.png'
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes("update-team")) {
          this.update = true;
          this.activatedRoute.queryParams.subscribe(async (data) => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
              this.state = this.router.getCurrentNavigation()?.extras.state;
              console.log("state", this.state)
              this.imgView = this.state.state.team.grp_image;
              this.teamId = this.state.state.team.id;
              var imgExt = this.getUrlExtension(this.imgView);

              const response = await fetch(this.imgView);
              const blob = await response.blob();
              const file = new File([blob], "profileImage." + imgExt, {
                type: blob.type,
              });
              console.log("new file", file)
              this.mCreateTeamRequest.grp_image = file;
              this.createTeamFormgroup.controls['sport'].setValue(this.state.state.team.grp_sport_id)
              this.createTeamFormgroup.controls['title'].setValue(this.state.state.team.grp_name)
              this.createTeamFormgroup.controls['description'].setValue(this.state.state.team.grp_about)
              this.friendSelect = this.state.state.team.users;
              this.mCreateTeamRequest.grp_invite = this.friendSelect.map((x: any) => x.id).join(",")
              this.friendId = "," + this.mCreateTeamRequest.grp_invite + ","
              this.friend_name = this.friendSelect.map((x: any) => x.name).join(",")
              console.log(this.friend_name)
              this.createTeamFormgroup.controls['friend'].setValue(this.friend_name)
              this.createTeamFormgroup.controls['gender'].setValue(this.state.state.team.grp_gender)
            }
          });
        } else {
          this.update = false;
          this.createTeamFormgroup.controls['sport'].setValue("")
          this.createTeamFormgroup.controls['title'].setValue("")
          this.createTeamFormgroup.controls['description'].setValue("")
          this.createTeamFormgroup.controls['friend'].setValue("")
          this.createTeamFormgroup.controls['gender'].setValue("")
          this.mCreateTeamRequest.grp_about = '';
          this.mCreateTeamRequest.grp_gender = '';
          this.mCreateTeamRequest.grp_invite = '';
          this.friendId = '';
        }
      }
    });


  }
  /**
   * getUrlExtension used to convert base64 to url
   * @param url 
   * @returns 
   */
  getUrlExtension(url: any) {
    if (url) {
      return url
        .split(/[#?]/)[0]
        .split(".")
        .pop()
        .trim();
    }
  }

  ngOnInit(): void {
    this.wsMember.getAvailFriends().toPromise().then(resUsers => {
      if (resUsers && resUsers.status == 200) {
        this.mFriendListResponse.data = resUsers.data;
      } else {
        this.toast.error(resUsers.message);
      }
    }, error => {
      console.log("getAvailFriends error", error)
      this.toast.error(error?.error?.message);
    })
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
  }

  /**
   * getFriendList used to get friend list
   * @param content 
   */
  getFriendList(content: any) {
    console.log("content", content)
    this.createFriendTeam = true;
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
   * getDismissReason used to dismiss modal
   * @param reason 
   * @returns 
   */
  getDismissReason(reason: any): string {
    this.createFriendTeam = false;
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
   * selectFriend used to select friend
   * @param friend 
   */
  selectFriend(friend: any) {
    console.log(friend);
    if (this.friendId.includes("," + friend.id + ",")) {
      for (var i = 0; i < this.friendSelect.length; i++) {
        if (this.friendSelect[i].id == friend.id) {
          this.friendSelect.splice(i, 1);
        }
      }
    } else {
      this.friendSelect.push(friend);
    }
    console.log("friendId", this.friendId)
    this.mCreateTeamRequest.grp_invite = this.friendSelect.map((x: any) => x.id).join(",")
    this.friendId = "," + this.mCreateTeamRequest.grp_invite + ","
    this.friend_name = this.friendSelect.map((x: any) => x.fname + " " + x.lname).join(",")
    console.log(this.friend_name)
    this.createTeamFormgroup.controls['friend'].setValue(this.friend_name)
  }
  /**
   * searchFriend used to search friend by name
   * @param event 
   */
  searchFriend(event: any) {
    this.searchtoggle = true;
    console.log(event.target.value)
    this.searchFriendList = this.search(this.mFriendListResponse.data, event.target.value);
    console.log(this.searchFriendList)
  }
  /**
   * search search by name
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
      entry = source[index];
      if ((entry && entry.fname && entry.fname.toUpperCase().indexOf(name) !== -1)) {
        results.push(entry);
      }

    }
    return results;
  }
  /**
   * saveFriend used to save friend
   */
  saveFriend() {
    console.log(this.mCreateTeamRequest.grp_invite)
    if (this.mCreateTeamRequest.grp_invite == '' || this.mCreateTeamRequest.grp_invite == undefined) {
      this.toast.error("Please select Friend!")
      this.modalService.hasOpenModals();
    } else {
      this.createTeamFormgroup.controls['friend'].setValue(this.friend_name)
      this.modalService.dismissAll();
    }
  }

  /**
   * preview used to select image
   * @param fileInput 
   * @returns 
   */
  preview(fileInput: any) {
    this.imageError = '';
    this.createTeamFormgroup.controls.image.setValue(fileInput.target.files[0]);
    this.mCreateTeamRequest.grp_image = fileInput.target.files[0];
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
   * createNewTeam used to create new team
   */
  createNewTeam() {
    this.mCreateTeamRequest.grp_name = this.createTeamFormgroup.controls["title"].value;
    this.mCreateTeamRequest.grp_about = this.createTeamFormgroup.controls["description"].value;
    this.mCreateTeamRequest.grp_sport_id = this.createTeamFormgroup.controls["sport"].value;
    this.mCreateTeamRequest.grp_gender = this.createTeamFormgroup.controls["gender"].value;
    if (this.mCreateTeamRequest.grp_name == '' || this.mCreateTeamRequest.grp_name == undefined) {
      this.toast.error("Please enter Team Name!")
    } else if (this.mCreateTeamRequest.grp_sport_id == '' || this.mCreateTeamRequest.grp_sport_id == undefined) {
      this.toast.error("Please select any sport for Team!")
    } else if (this.mCreateTeamRequest.grp_gender == '' || this.mCreateTeamRequest.grp_gender == undefined) {
      this.toast.error("Please Select Gender!")
    } else if (this.mCreateTeamRequest.grp_about == '' || this.mCreateTeamRequest.grp_about == undefined) {
      this.toast.error("Please enter about team!")
    } else if (this.mCreateTeamRequest.grp_image == '' || this.mCreateTeamRequest.grp_image == undefined) {
      this.toast.error("Please enter Team Image!")
    } else if (this.mCreateTeamRequest.grp_invite == '' || this.mCreateTeamRequest.grp_invite == undefined) {
      this.toast.error("Please select any friend for Team!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateTeamRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateTeamRequest)
      this.wsList.createTeam(this.mCreateTeamRequest).toPromise().then(resCreateTeam => {

        if (resCreateTeam.status || resCreateTeam.status == 200) {
          this.loaderShow = false;
          this.toast.success(resCreateTeam.message);
          this.router.navigate(["/home"])
        } else {
          this.loaderShow = false;
          this.toast.error(resCreateTeam.message);
        }

      }, error => {
        this.loaderShow = false;
        console.log("resCreateFriendly error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * updateTeam used to update team
   */
  updateTeam() {
    this.mCreateTeamRequest.grp_name = this.createTeamFormgroup.controls["title"].value;
    this.mCreateTeamRequest.grp_about = this.createTeamFormgroup.controls["description"].value;
    this.mCreateTeamRequest.grp_sport_id = this.createTeamFormgroup.controls["sport"].value;
    this.mCreateTeamRequest.grp_gender = this.createTeamFormgroup.controls["gender"].value;
    if (this.mCreateTeamRequest.grp_name == '' || this.mCreateTeamRequest.grp_name == undefined) {
      this.toast.error("Please enter Team Name!")
    } else if (this.mCreateTeamRequest.grp_sport_id == '' || this.mCreateTeamRequest.grp_sport_id == undefined) {
      this.toast.error("Please select any sport for Team!")
    } else if (this.mCreateTeamRequest.grp_gender == '' || this.mCreateTeamRequest.grp_gender == undefined) {
      this.toast.error("Please Select Gender!")
    } else if (this.mCreateTeamRequest.grp_about == '' || this.mCreateTeamRequest.grp_about == undefined) {
      this.toast.error("Please enter about team!")
    } else if (this.mCreateTeamRequest.grp_image == '' || this.mCreateTeamRequest.grp_image == undefined) {
      this.toast.error("Please enter Team Image!")
    } else if (this.mCreateTeamRequest.grp_invite == '' || this.mCreateTeamRequest.grp_invite == undefined) {
      this.toast.error("Please select any friend for Team!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateTeamRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateTeamRequest)
      this.wsList.updateSelectedTeam(this.mCreateTeamRequest, this.teamId).toPromise().then(resUpdateTeam => {

        if (resUpdateTeam.status || resUpdateTeam.status == 200) {
          this.loaderShow = false;
          this.toast.success(resUpdateTeam.message);
          this.router.navigate(["/home"])
        } else {
          this.loaderShow = false;
          this.toast.error(resUpdateTeam.message);
        }

      }, error => {
        this.loaderShow = false;
        console.log("resUpdateTeam error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }


}