import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WsHomeService } from 'src/app/ws/wsHome/ws-home.service';
import { WsProfileService } from 'src/app/ws/wsProfile/ws-profile.service';
import { MHomeUpcomingFriendlyResponse } from '../home/home.module';
import { MCreateEventRequest, MListGroupResponse, MListVenueResponse } from '../list/list.module';
import * as _ from 'lodash';
import { WsListService } from 'src/app/ws/wslist/ws-list.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WsMembersService } from 'src/app/ws/wsMembers/ws-members.service';
import { MFriendListResponse, MSportsResponse } from '../profile/profile.module';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  createEventFormgroup: FormGroup;
  mHomeUpcomingFriendlyResponse: MHomeUpcomingFriendlyResponse = new MHomeUpcomingFriendlyResponse();
  mCreateEventRequest: MCreateEventRequest = new MCreateEventRequest();
  mListGroupResponse: MListGroupResponse = new MListGroupResponse();
  mSportsResponse: MSportsResponse = new MSportsResponse();
  mListVenueResponse: MListVenueResponse = new MListVenueResponse();
  closeResult: any;
  searchtoggle: boolean = false;
  loaderShow: boolean = false;
  createFriendlyUser: boolean = false;
  createEventFriendly: boolean = false;
  title: any;
  searchFriendlyList: any = [];
  imageError: string = '';
  imgView: any;
  update: boolean = false;
  state: any
  friendlyData: any = [];
  eventId: any;
  mFriendListResponse: MFriendListResponse = new MFriendListResponse();
  friendId: string = '';
  friendSelect: any = [];
  friend_name: any = '';
  searchFriendList: any;
  createFriendlyVenue: boolean = false;
  searchVenueList: any;
  constructor(private wsMember: WsMembersService, private activatedRoute: ActivatedRoute, private router: Router, private wsList: WsListService, private wsHome: WsHomeService, private modalService: NgbModal, private formBuilder: FormBuilder, private toast: ToastrService, private wsProfile: WsProfileService) {
    this.createEventFormgroup = this.formBuilder.group({
      sport: [''],
      date: [''],
      time: [''],
      description: [''],
      venue: [''],
      friend: [''],
      title: [''],
      image: ['']
    });
    this.imgView = '../../../assets/images/camera1.png'
    var today = moment().format('YYYY-MM-DD');
    var todayTime = moment().format('HH:mm:ss');
    this.createEventFormgroup.controls['date'].setValue(today + " " + todayTime)
    this.mCreateEventRequest.e_date = today;
    this.mCreateEventRequest.e_time = todayTime;
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes("update-match")) {
          this.update = true;
          this.activatedRoute.queryParams.subscribe(async (data) => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
              this.state = this.router.getCurrentNavigation()?.extras.state;
              console.log("state", this.state)
              this.imgView = this.state.state.event.e_image;
              this.eventId = this.state.state.event.id;
              var imgExt = this.getUrlExtension(this.imgView);

              const response = await fetch(this.imgView);
              const blob = await response.blob();
              const file = new File([blob], "profileImage." + imgExt, {
                type: blob.type,
              });
              console.log("new file", file)
              this.mCreateEventRequest.e_image = file;
              this.mCreateEventRequest.e_location_id = this.state.state.event.e_location_id;
              this.mCreateEventRequest.e_location = this.state.state.event.e_location;
              this.createEventFormgroup.controls['title'].setValue(this.state.state.event.event_name)
              this.createEventFormgroup.controls['description'].setValue(this.state.state.event.e_group)
              this.createEventFormgroup.controls['venue'].setValue(this.state.state.event.e_location)
              this.createEventFormgroup.controls['sport'].setValue(this.state.state.event.e_sport_id)
              this.wsMember.getFriends().toPromise().then(resFriend => {
                console.log("resFriend", resFriend)
                if (resFriend && resFriend.status) {

                  this.friendlyData = resFriend.data;
                  var friendlySelected = this.friendlyData.filter(((friendly: any) => {
                    return this.state.state.event.e_invite.indexOf(friendly.user_id.toString()) != -1;
                  }))
                  console.log("fre", friendlySelected)
                  this.selectFriend(friendlySelected[0])
                } else {
                  this.toast.error(resFriend.message);
                }
              }, error => {
                console.log("getFriends error", error)
                this.toast.error(error?.error?.message);
              })
            }
          });
        } else {
          this.update = false;

          this.createEventFormgroup.controls['sport'].setValue(" ")
          this.createEventFormgroup.controls['title'].setValue(" ")
          this.createEventFormgroup.controls['description'].setValue(" ")
          this.createEventFormgroup.controls['venue'].setValue(" ")
          this.createEventFormgroup.controls['friend'].setValue(" ")
          this.mCreateEventRequest.e_invite = '';
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

    // this.wsHome.getUpcomingFriendly().toPromise().then(resFriendly => {
    //   if (resFriendly && resFriendly.status) {
    //     this.mHomeUpcomingFriendlyResponse.data = resFriendly.data;
    //   } else {
    //     this.toast.error(resFriendly.message);
    //   }
    // }, error => {
    //   console.log("getUpcomingFriendly error", error)
    //   this.toast.error(error?.error?.message);
    // })
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
  }
  /**
   * getFriendlyList used to get friendly list
   */
  // getFriendlyList(content: any) {
  //   console.log("content", content)
  //   this.createEventFriendly = true;
  //   const config: NgbModalOptions = {
  //     backdrop: 'static',
  //     windowClass: 'slideInUp'
  //   };
  //   this.modalService.open(content, config).result.then((result) => {
  //     console.log("Closed with:", result)
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     console.log("Dismissed", reason)
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

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
   * getDismissReason used to dismiss modal
   * @param reason 
   * @returns 
   */
  getDismissReason(reason: any): string {
    this.createFriendlyUser = false;
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
   * selectFriendly used to select friendly for event
   * @param friendly 
   */
  // selectFriendly(friendly: any) {
  //   console.log(friendly);
  //   this.mCreateEventRequest.e_invite = friendly.id;
  //   this.title = friendly.frd_title;
  //   this.mCreateEventRequest.e_location_id = friendly.frd_location_id;
  //   this.mCreateEventRequest.e_location = friendly.frd_location;
  //   this.mCreateEventRequest.e_sport_id = friendly.frd_sport_id;
  //   this.mCreateEventRequest.e_date = friendly.frd_date
  //   this.mCreateEventRequest.e_time = friendly.frd_time
  //   this.createEventFormgroup.controls['friendly'].setValue(friendly.frd_title)
  //   this.createEventFormgroup.controls['venue'].setValue(this.mCreateEventRequest.e_location)
  //   this.createEventFormgroup.controls['date'].setValue(this.mCreateEventRequest.e_date + " " + this.mCreateEventRequest.e_time)
  //   this.createEventFormgroup.controls['sport'].setValue(this.mCreateEventRequest.e_sport_id)
  // }

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
    this.mCreateEventRequest.e_invite = this.friendSelect.map((x: any) => x.user.id).join(",")
    this.friendId = "," + this.mCreateEventRequest.e_invite + ","
    this.friend_name = this.friendSelect.map((x: any) => x.user.fname + " " + x.user.lname).join(",")
    console.log(this.friend_name)
    this.createEventFormgroup.controls['friend'].setValue(this.friend_name)
  }
  /**
   * searchFriendly used to search by name using searchbar
   * @param event 
   */
  // searchFriendly(event: any) {
  //   this.searchtoggle = true;
  //   console.log(event.target.value)
  //   this.searchFriendlyList = this.search(this.mHomeUpcomingFriendlyResponse.data, event.target.value);
  //   console.log(this.searchFriendlyList)
  // }
  /**
   *  selectVenue used to select venue
   * @param venue 
   */
  selectVenue(venue: any) {
    console.log(venue);
    this.mCreateEventRequest.e_location_id = venue.id;
    this.mCreateEventRequest.e_location = venue.name;
    this.createEventFormgroup.controls['venue'].setValue(this.mCreateEventRequest.e_location)
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
   * search search by name
   * @param source 
   * @param name 
   * @returns 
   */
  search(source: any, name: any, type?: any) {
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
      } else if (type == "friend") {
        if ((entry && entry.user.fname && entry.user.fname.toUpperCase().indexOf(name) !== -1)) {
          results.push(entry);
        }
      }
    }
    return results;
  }
  /**
   * saveFriendly used to save friendly
   */
  // saveFriendly() {
  //   console.log(this.mCreateEventRequest.e_invite)
  //   if (this.mCreateEventRequest.e_invite == '' || this.mCreateEventRequest.e_invite == undefined) {
  //     this.toast.error("Please select Friendly!")
  //     this.modalService.hasOpenModals();
  //   } else {
  //     this.createEventFormgroup.controls['friendly'].setValue(this.title)
  //     this.modalService.dismissAll();
  //   }
  // }

  /**
   * saveVenue used to save the venue
   */
  saveVenue() {
    console.log(this.mCreateEventRequest.e_location_id)
    console.log(this.mCreateEventRequest.e_location)
    if (this.mCreateEventRequest.e_location == '' || this.mCreateEventRequest.e_location == undefined) {
      this.toast.error("Please select Venue!")
      this.modalService.hasOpenModals();
    } else {
      this.createEventFormgroup.controls['venue'].setValue(this.mCreateEventRequest.e_location)
      this.modalService.dismissAll();
    }
  }
  /**
   * preview used to set event image
   */
  preview(fileInput: any) {
    this.imageError = '';
    this.createEventFormgroup.controls.image.setValue(fileInput.target.files[0]);
    console.log(fileInput.target.files)
    this.mCreateEventRequest.e_image = fileInput.target.files[0];
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
    * saveFriend used to save the friend
    */
  saveFriend() {
    console.log(this.mCreateEventRequest.e_invite)
    if (this.mCreateEventRequest.e_invite == '' || this.mCreateEventRequest.e_invite == undefined) {
      this.toast.error("Please select Friend!")
      this.modalService.hasOpenModals();
    } else {
      this.createEventFormgroup.controls['friend'].setValue(this.friend_name)
      this.modalService.dismissAll();
    }
  }

  /**
   *  createNewEvent used to create match
   */
  createNewEvent() {
    this.mCreateEventRequest.event_name = this.createEventFormgroup.controls["title"].value;
    this.mCreateEventRequest.e_group = this.createEventFormgroup.controls["description"].value;
    this.mCreateEventRequest.e_sport_id = this.createEventFormgroup.controls["sport"].value;

    if (this.mCreateEventRequest.event_name == '' || this.mCreateEventRequest.event_name == undefined) {
      this.toast.error("Please enter match Name!")
    } else if (this.mCreateEventRequest.e_invite == '' || this.mCreateEventRequest.e_invite == undefined) {
      this.toast.error("Please select any friendly for match!")
    } else if (this.mCreateEventRequest.e_sport_id == '' || this.mCreateEventRequest.e_sport_id == undefined) {
      this.toast.error("Please select any sport for match!")
    } else if (this.mCreateEventRequest.e_location_id == null || this.mCreateEventRequest.e_location_id == undefined) {
      this.toast.error("Please enter match Location!")
    } else if (this.mCreateEventRequest.e_date == '' || this.mCreateEventRequest.e_date == undefined) {
      this.toast.error("Please enter match date!")
    } else if (this.mCreateEventRequest.e_time == '' || this.mCreateEventRequest.e_time == undefined) {
      this.toast.error("Please enter match time!")
    } else if (this.mCreateEventRequest.e_group == '' || this.mCreateEventRequest.e_group == undefined) {
      this.toast.error("Please enter match description!")
      // } else if (this.mCreateEventRequest.e_image == '' || this.mCreateEventRequest.e_image == undefined) {
      //   this.toast.error("Please select any image for match!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateEventRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateEventRequest)
      this.wsList.createEvent(this.mCreateEventRequest).toPromise().then(resCreateEvent => {

        if (resCreateEvent.status && resCreateEvent.status == 200) {
          this.loaderShow = false;
          this.toast.success(resCreateEvent.message);
          this.router.navigate(['/list'])
        } else {
          this.loaderShow = false;
          this.toast.error(resCreateEvent.message);
        }

      }, error => {
        this.loaderShow = false;
        console.log("resCreateEvent error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * updateEvent used to update existing event
   */
  updateEvent() {
    this.mCreateEventRequest.event_name = this.createEventFormgroup.controls["title"].value;
    this.mCreateEventRequest.e_group = this.createEventFormgroup.controls["description"].value;
    this.mCreateEventRequest.e_sport_id = this.createEventFormgroup.controls["sport"].value;
    if (this.mCreateEventRequest.event_name == '' || this.mCreateEventRequest.event_name == undefined) {
      this.toast.error("Please enter match Name!")
    } else if (this.mCreateEventRequest.e_invite == '' || this.mCreateEventRequest.e_invite == undefined) {
      this.toast.error("Please select any friend for match!")
    } else if (this.mCreateEventRequest.e_sport_id == '' || this.mCreateEventRequest.e_sport_id == undefined) {
      this.toast.error("Please select any sport for match!")
    } else if (this.mCreateEventRequest.e_location_id == null || this.mCreateEventRequest.e_location_id == undefined) {
      this.toast.error("Please enter match Location!")
    } else if (this.mCreateEventRequest.e_date == '' || this.mCreateEventRequest.e_date == undefined) {
      this.toast.error("Please enter match date!")
    } else if (this.mCreateEventRequest.e_time == '' || this.mCreateEventRequest.e_time == undefined) {
      this.toast.error("Please enter match time!")
    } else if (this.mCreateEventRequest.e_group == '' || this.mCreateEventRequest.e_group == undefined) {
      this.toast.error("Please enter match description!")
      // } else if (this.mCreateEventRequest.e_image == '' || this.mCreateEventRequest.e_image == undefined) {
      //   this.toast.error("Please select any image for match!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateEventRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateEventRequest)
      this.wsList.updateSelectedEvent(this.mCreateEventRequest, this.eventId).toPromise().then(resUpdateEvent => {

        if (resUpdateEvent.status || resUpdateEvent.status == 200) {
          this.loaderShow = false;
          this.toast.success(resUpdateEvent.message);
          this.router.navigate(['/list'])
        } else {
          this.loaderShow = false;
          this.toast.error(resUpdateEvent.message);
        }

      }, error => {
        this.loaderShow = false;
        console.log("resUpdateEvent error", error)
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
    this.mCreateEventRequest.e_date = date.split("T")[0];
    this.mCreateEventRequest.e_time = date.split("T")[1];
  }


}

