import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WsListService } from 'src/app/ws/wslist/ws-list.service';
import { WsMembersService } from 'src/app/ws/wsMembers/ws-members.service';
import { WsProfileService } from 'src/app/ws/wsProfile/ws-profile.service';
import { MCreateFriendlyRequest, MListGroupResponse, MListRefreeResponse, MListVenueResponse, MCreateFriendlyResponse } from '../list/list.module';
import { MFriendListResponse, MSportsResponse } from '../profile/profile.module';

@Component({
  selector: 'app-create-friendly',
  templateUrl: './create-friendly.component.html',
  styleUrls: ['./create-friendly.component.scss']
})
export class CreateFriendlyComponent implements OnInit {
  createFriendlyFormgroup: FormGroup;
  mListVenueResponse: MListVenueResponse = new MListVenueResponse();
  mListGroupResponse: MListGroupResponse = new MListGroupResponse();
  mListRefreeResponse: MListRefreeResponse = new MListRefreeResponse();
  mSportsResponse: MSportsResponse = new MSportsResponse();
  closeResult: any;
  selected: any;
  c_location_id: any;
  mCreateFriendlyRequest: MCreateFriendlyRequest = new MCreateFriendlyRequest();
  mCreateFriendlyResponse: MCreateFriendlyResponse = new MCreateFriendlyResponse();
  searchVenueList: any;
  searchtoggle: boolean = false;
  createFriendlyVenue: boolean = false;
  team_name: any;
  searchTeamList: any;
  searchRefreeList: any;
  refree_name: any;
  createFriendlyRefree: boolean = false;
  teamId: string = '';
  refreeId: string = '';
  refreesSelect: any = [];
  teamSelect: any = [];
  loaderShow: boolean = false;
  mFriendListResponse: MFriendListResponse = new MFriendListResponse();
  searchFriendList: any;
  friendId: string = '';
  friendSelect: any = [];
  friend_name: any = '';
  createFriendlyUser: boolean = false;
  update: boolean = false;
  state: any;
  friendlyId: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private wsMember: WsMembersService, private modalService: NgbModal, private formBuilder: FormBuilder, private wsList: WsListService, private toast: ToastrService, private wsProfile: WsProfileService) {
    this.createFriendlyFormgroup = this.formBuilder.group({
      sport: [''],
      date: [''],
      time: [''],
      description: [''],
      venue: [''],
      friend: [''],
      refree: [''],
      title: ['']
    });
    var today = moment().format('YYYY-MM-DD');
    var todayTime = moment().format('HH:mm:ss');
    this.createFriendlyFormgroup.controls['date'].setValue(today + " " + todayTime)
    this.mCreateFriendlyRequest.frd_date = today;
    this.mCreateFriendlyRequest.frd_time = todayTime;
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes("update-friendly")) {
          this.update = true;
          this.activatedRoute.queryParams.subscribe(data => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
              this.state = this.router.getCurrentNavigation()?.extras.state;
              console.log("state", this.state)
              this.createFriendlyFormgroup.controls['sport'].setValue(this.state.state.friendly.frd_sport_id)
              this.createFriendlyFormgroup.controls['title'].setValue(this.state.state.friendly.frd_title)
              this.createFriendlyFormgroup.controls['description'].setValue(this.state.state.friendly.frd_desc)
              this.createFriendlyFormgroup.controls['date'].setValue(this.state.state.friendly.frd_date + " " + this.state.state.friendly.frd_time)
              this.mCreateFriendlyRequest.frd_date = this.state.state.friendly.frd_date;
              this.mCreateFriendlyRequest.frd_time = this.state.state.friendly.frd_time;
              this.createFriendlyFormgroup.controls['venue'].setValue(this.state.state.friendly.frd_location)
              this.mCreateFriendlyRequest.frd_location_id = this.state.state.friendly.frd_location_id;
              this.mCreateFriendlyRequest.frd_location = this.state.state.friendly.frd_location;
              this.friendSelect = this.state.state.friendly.frd_invite;
              this.mCreateFriendlyRequest.frd_invite = this.friendSelect.map((x: any) => x.id).join(",")
              this.friendId = "," + this.mCreateFriendlyRequest.frd_invite + ","
              this.friend_name = this.friendSelect.map((x: any) => x.name).join(",")
              this.createFriendlyFormgroup.controls['friend'].setValue(this.friend_name);
              this.refreesSelect = this.state.state.friendly.frd_ref_id;
              console.log("refreeSelect", this.refreesSelect)
              this.mCreateFriendlyRequest.frd_ref_id = this.refreesSelect.map((x: any) => x.id).join(",")
              this.refreeId = "," + this.mCreateFriendlyRequest.frd_ref_id + ","
              this.refree_name = this.refreesSelect.map((x: any) => x.name).join(",")
              this.createFriendlyFormgroup.controls['refree'].setValue(this.refree_name)
              this.friendlyId = this.state.state.friendly.id;
            }
          });
        } else {
          this.update = false;
          this.createFriendlyFormgroup.controls['sport'].setValue("")
          this.createFriendlyFormgroup.controls['title'].setValue("")
          this.createFriendlyFormgroup.controls['description'].setValue("")
          this.createFriendlyFormgroup.controls['venue'].setValue("")
          this.createFriendlyFormgroup.controls['friend'].setValue("")
          this.createFriendlyFormgroup.controls['refree'].setValue("")
          this.mCreateFriendlyRequest.frd_invite = '';
          this.mCreateFriendlyRequest.frd_ref_id = '';
        }
      }
    });
  }

  ngOnInit(): void {
    this.wsList.getVenueList().toPromise().then(resVenue => {
      if (resVenue && resVenue.status) {
        this.mListVenueResponse.data = resVenue.data;
      } else {
        this.toast.error(resVenue.message);
      }
    }, error => {
      console.log("getVenueList error", error)
      this.toast.error(error?.error?.message);
    })
    this.wsMember.getFriends().toPromise().then(resUsers => {
      if (resUsers && resUsers.status) {
        this.mFriendListResponse.data = resUsers.data;
      } else {
        this.toast.error(resUsers.message);
      }
    }, error => {
      console.log("getFriends error", error)
      this.toast.error(error?.error?.message);
    })
    this.wsList.getRefree().toPromise().then(resRefree => {
      if (resRefree && resRefree.status) {
        this.mListRefreeResponse.data = resRefree.data;
      } else {
        this.toast.error(resRefree.message);
      }
    }, error => {
      console.log("getVenueList error", error)
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
   * getVenueList used to get list of venue
   * @param content 
   */
  getVenueList(content: any) {
    console.log("content", content)
    this.createFriendlyVenue = true;
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
   * getFriendList used to get friends list
   * @param content 
   */
  getFriendList(content: any) {

    console.log("content", content)
    this.createFriendlyUser = true;
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
   * getRefreeList used to get refree list
   * @param content 
   */
  getRefreeList(content: any) {
    console.log("content", content)
    this.createFriendlyRefree = true;
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
   * getDismissReason used to close modal
   * @param reason 
   * @returns 
   */
  getDismissReason(reason: any): string {
    this.createFriendlyVenue = false;
    this.createFriendlyUser = false;
    this.createFriendlyRefree = false;
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
   *  selectVenue used to select venue
   * @param venue 
   */
  selectVenue(venue: any) {
    console.log(venue);
    this.mCreateFriendlyRequest.frd_location_id = venue.id;
    this.mCreateFriendlyRequest.frd_location = venue.name;
    this.createFriendlyFormgroup.controls['venue'].setValue(this.mCreateFriendlyRequest.frd_location)
  }
  /**
   * selectFriend used to select friend
   * @param friend 
   */
  selectFriend(friend: any) {
    console.log(friend);
    if (this.friendId.includes("," + friend?.user?.id + ",")) {
      console.log("equals")
      for (var i = 0; i < this.friendSelect.length; i++) {
        if (this.friendSelect[i].id == friend?.user?.id) {
          this.friendSelect.splice(i, 1);
        }
      }
    } else {
      this.friendSelect.push(friend);
    }
    console.log("friendId", this.friendId)
    this.mCreateFriendlyRequest.frd_invite = this.friendSelect.map((x: any) => x.user.id).join(",")
    this.friendId = "," + this.mCreateFriendlyRequest.frd_invite + ","
    this.friend_name = this.friendSelect.map((x: any) => x.user.fname + " " + x.user.lname).join(",")
    console.log(this.mCreateFriendlyRequest.frd_ref_id)
    console.log(this.friend_name)
    console.log(this.refreeId)
    this.createFriendlyFormgroup.controls['friend'].setValue(this.friend_name)
  }
  /**
   * selectRefree used to select refree
   * @param refree 
   */
  selectRefree(refree: any) {
    console.log(refree);
    if (this.refreeId.includes("," + refree.id + ",")) {
      for (var i = 0; i < this.refreesSelect.length; i++) {
        if (this.refreesSelect[i].id == refree.id) {
          this.refreesSelect.splice(i, 1);
        }
      }
    } else {
      this.refreesSelect.push(refree);
    }
    this.mCreateFriendlyRequest.frd_ref_id = this.refreesSelect.map((x: any) => x.id).join(",")
    this.refreeId = "," + this.mCreateFriendlyRequest.frd_ref_id + ","
    this.refree_name = this.refreesSelect.map((x: any) => x.fname + " " + x.lname).join(",")
    console.log(this.mCreateFriendlyRequest.frd_ref_id)
    console.log(this.refree_name)
    console.log(this.refreeId)
    this.createFriendlyFormgroup.controls['refree'].setValue(this.refree_name)
  }

  /**
   * searchVenue used to search venue using searchbar
   * @param event 
   */
  searchVenue(event: any) {
    this.searchtoggle = true;
    console.log(event.target.value)
    this.searchVenueList = this.search(this.mListVenueResponse.data, event.target.value, 'venue');
    console.log(this.searchVenueList)
  }
  /**
   * searchFriend used to search friend using searchbar
   * @param event 
   */
  searchFriend(event: any) {
    this.searchtoggle = true;
    console.log(event.target.value)
    this.searchFriendList = this.search(this.mListGroupResponse.data, event.target.value, 'friend');
    console.log(this.searchFriendList)
  }
  /**
   * searchRefree used to search refree using searchbar
   * @param event 
   */
  searchRefree(event: any) {
    this.searchtoggle = true;
    console.log(event.target.value)
    this.searchRefreeList = this.search(this.mListRefreeResponse.data, event.target.value, 'refree');
    console.log(this.searchTeamList)
  }
  /**
   * search search by name
   * @param source 
   * @param name 
   * @param type 
   * @returns 
   */
  search(source: any, name: any, type: any) {
    var results = [];
    var index;
    var entry;

    name = name.toUpperCase();
    for (index = 0; index < source.length; ++index) {
      entry = source[index];
      if (type == "venue") {
        if ((entry && entry.name && entry.name.toUpperCase().indexOf(name) !== -1)) {
          results.push(entry);
        }
      } else if (type == "team") {
        if ((entry && entry.grp_name && entry.grp_name.toUpperCase().indexOf(name) !== -1)) {
          results.push(entry);
        }
      } else if (type == "refree") {
        if ((entry && entry.fname && entry.fname.toUpperCase().indexOf(name) !== -1)) {
          results.push(entry);
        }
      } else if (type == "friend") {
        if ((entry && entry.user.fname && entry.user.fname.toUpperCase().indexOf(name) !== -1)) {
          results.push(entry);
        }
      }
    }
    return results;
  }
  /**
   * saveVenue used to save the venue
   */
  saveVenue() {
    console.log(this.mCreateFriendlyRequest.frd_location_id)
    console.log(this.mCreateFriendlyRequest.frd_location)
    if (this.mCreateFriendlyRequest.frd_location == '' || this.mCreateFriendlyRequest.frd_location == undefined) {
      this.toast.error("Please select Venue!")
      this.modalService.hasOpenModals();
    } else {
      this.createFriendlyFormgroup.controls['venue'].setValue(this.mCreateFriendlyRequest.frd_location)
      this.modalService.dismissAll();
    }
  }
  /**
    * saveFriend used to save the friend
    */
  saveFriend() {
    console.log(this.mCreateFriendlyRequest.frd_invite)
    if (this.mCreateFriendlyRequest.frd_invite == '' || this.mCreateFriendlyRequest.frd_invite == undefined) {
      this.toast.error("Please select Friend!")
      this.modalService.hasOpenModals();
    } else {
      this.createFriendlyFormgroup.controls['friend'].setValue(this.friend_name)
      this.modalService.dismissAll();
    }
  }
  /**
    * saveRefree used to save the refree
    */
  saveRefree() {
    console.log(this.mCreateFriendlyRequest.frd_ref_id)
    console.log(this.mCreateFriendlyRequest.frd_invite)
    console.log(this.mCreateFriendlyRequest.frd_location)
    if (this.mCreateFriendlyRequest.frd_ref_id == '' || this.mCreateFriendlyRequest.frd_ref_id == undefined) {
      this.toast.error("Please select Refree!")
      this.modalService.hasOpenModals();
    } else {
      this.createFriendlyFormgroup.controls['refree'].setValue(this.refree_name)
      this.modalService.dismissAll();
    }
  }
  /**
   * createNewFriendly used to create new friendly 
   */
  createNewFriendly() {
    this.mCreateFriendlyRequest.frd_title = this.createFriendlyFormgroup.controls["title"].value;
    this.mCreateFriendlyRequest.frd_desc = this.createFriendlyFormgroup.controls["description"].value;
    this.mCreateFriendlyRequest.frd_sport_id = this.createFriendlyFormgroup.controls["sport"].value;
    if (this.mCreateFriendlyRequest.frd_sport_id == '' || this.mCreateFriendlyRequest.frd_sport_id == undefined) {
      this.toast.error("Please select any sport for friendly!")
    } else if (this.mCreateFriendlyRequest.frd_location_id == null || this.mCreateFriendlyRequest.frd_location_id == undefined) {
      this.toast.error("Please enter friendly title!")
    } else if (this.mCreateFriendlyRequest.frd_title == '' || this.mCreateFriendlyRequest.frd_title == undefined) {
      this.toast.error("Please enter friendly title!")
    } else if (this.mCreateFriendlyRequest.frd_date == '' || this.mCreateFriendlyRequest.frd_date == undefined) {
      this.toast.error("Please enter friendly date!")
    } else if (this.mCreateFriendlyRequest.frd_time == '' || this.mCreateFriendlyRequest.frd_time == undefined) {
      this.toast.error("Please enter friendly time!")
    } else if (this.mCreateFriendlyRequest.frd_invite == '' || this.mCreateFriendlyRequest.frd_invite == undefined) {
      this.toast.error("Please select any team for friendly!")
    } else if (this.mCreateFriendlyRequest.frd_ref_id == '' || this.mCreateFriendlyRequest.frd_ref_id == undefined) {
      this.toast.error("Please select any refree for friendly!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateFriendlyRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateFriendlyRequest)
      this.wsList.createFriendly(this.mCreateFriendlyRequest).toPromise().then(resCreateFriendly => {

        if (resCreateFriendly.status && resCreateFriendly.data.length > 0) {
          this.loaderShow = false;
          this.toast.success(resCreateFriendly.message);
          this.router.navigate(['/list'])
        } else {
          this.loaderShow = false;
          this.toast.error(resCreateFriendly.message);
        }

      }, error => {
        this.loaderShow = false;
        console.log("resCreateFriendly error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * updateFriendly used to update friendly
   */
  updateFriendly() {
    this.mCreateFriendlyRequest.frd_title = this.createFriendlyFormgroup.controls["title"].value;
    this.mCreateFriendlyRequest.frd_desc = this.createFriendlyFormgroup.controls["description"].value;
    this.mCreateFriendlyRequest.frd_sport_id = this.createFriendlyFormgroup.controls["sport"].value;
    if (this.mCreateFriendlyRequest.frd_sport_id == '' || this.mCreateFriendlyRequest.frd_sport_id == undefined) {
      this.toast.error("Please select any sport for friendly!")
    } else if (this.mCreateFriendlyRequest.frd_location_id == null || this.mCreateFriendlyRequest.frd_location_id == undefined) {
      this.toast.error("Please enter friendly title!")
    } else if (this.mCreateFriendlyRequest.frd_title == '' || this.mCreateFriendlyRequest.frd_title == undefined) {
      this.toast.error("Please enter friendly title!")
    } else if (this.mCreateFriendlyRequest.frd_date == '' || this.mCreateFriendlyRequest.frd_date == undefined) {
      this.toast.error("Please enter friendly date!")
    } else if (this.mCreateFriendlyRequest.frd_time == '' || this.mCreateFriendlyRequest.frd_time == undefined) {
      this.toast.error("Please enter friendly time!")
    } else if (this.mCreateFriendlyRequest.frd_invite == '' || this.mCreateFriendlyRequest.frd_invite == undefined) {
      this.toast.error("Please select any team for friendly!")
    } else if (this.mCreateFriendlyRequest.frd_ref_id == '' || this.mCreateFriendlyRequest.frd_ref_id == undefined) {
      this.toast.error("Please select any refree for friendly!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateFriendlyRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateFriendlyRequest)
      this.wsList.updateSelectedFriendly(this.mCreateFriendlyRequest, this.friendlyId).toPromise().then(resUpdateFriendly => {
        if (resUpdateFriendly.status && resUpdateFriendly.data.length > 0) {
          this.loaderShow = false;
          this.toast.success(resUpdateFriendly.message);
          this.router.navigate(['/list'])
        } else {
          this.loaderShow = false;
          this.toast.error(resUpdateFriendly.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("createChallenge error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * selectDate used to select date format
   * @param date 
   */
  selectDate(date: any) {
    console.log(date)
    this.mCreateFriendlyRequest.frd_date = date.split("T")[0];
    this.mCreateFriendlyRequest.frd_time = date.split("T")[1];
  }
  /**
   * selectTime used to select time format
   * @param time 
   */
  selectTime(time: any) {
    console.log(time)
    this.mCreateFriendlyRequest.frd_time = time;
  }


}
