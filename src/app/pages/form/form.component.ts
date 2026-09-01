import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { WsListService } from 'src/app/ws/wslist/ws-list.service';
import { WsProfileService } from 'src/app/ws/wsProfile/ws-profile.service';
import { MCreateChallengeRequest, MCreateChallengeResponse, MListGroupResponse, MListRefreeResponse, MListVenueResponse } from '../list/list.module';
import { MSportsResponse } from '../profile/profile.module';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  createChallengeFormgroup: FormGroup;
  mListVenueResponse: MListVenueResponse = new MListVenueResponse();
  mListGroupResponse: MListGroupResponse = new MListGroupResponse();
  mListRefreeResponse: MListRefreeResponse = new MListRefreeResponse();
  mSportsResponse: MSportsResponse = new MSportsResponse();
  closeResult: any;
  selected: any;
  c_location_id: any;
  mCreateChallengeRequest: MCreateChallengeRequest = new MCreateChallengeRequest();
  mCreateChallengeResponse: MCreateChallengeResponse = new MCreateChallengeResponse();
  searchVenueList: any;
  searchtoggle: boolean = false;
  createChallengeVenue: boolean = false;
  createChallengeTeam: boolean = false;
  team_name: any;
  searchTeamList: any;
  searchRefreeList: any;
  refree_name: any;
  createChallengeRefree: boolean = false;
  teamId: string = '';
  refreeId: string = '';
  refreesSelect: any = [];
  teamSelect: any = [];
  loaderShow: boolean = false;
  state: any;
  challengeId: any;
  update: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private modalService: NgbModal, private formBuilder: FormBuilder, private wsList: WsListService, private toast: ToastrService, private wsProfile: WsProfileService) {
    this.createChallengeFormgroup = this.formBuilder.group({
      sport: [''],
      date: [''],
      time: [''],
      description: [''],
      venue: [''],
      team: [''],
      refree: [''],
      title: ['']
    });
    var today = moment().format('YYYY-MM-DD');
    var todayTime = moment().format('HH:mm:ss');
    this.createChallengeFormgroup.controls['date'].setValue(today + " " + todayTime)
    this.mCreateChallengeRequest.c_date = today;
    this.mCreateChallengeRequest.c_time = todayTime;
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes("update-challenge")) {
          this.update = true;
          this.activatedRoute.queryParams.subscribe(data => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
              this.state = this.router.getCurrentNavigation()?.extras.state;
              console.log("state", this.state)
              this.createChallengeFormgroup.controls['sport'].setValue(this.state.state.challenge.c_sport_id)
              this.createChallengeFormgroup.controls['title'].setValue(this.state.state.challenge.c_title)
              this.createChallengeFormgroup.controls['description'].setValue(this.state.state.challenge.c_desc)
              this.createChallengeFormgroup.controls['date'].setValue(this.state.state.challenge.c_date + " " + this.state.state.challenge.c_time)
              this.mCreateChallengeRequest.c_date = this.state.state.challenge.c_date;
              this.mCreateChallengeRequest.c_time = this.state.state.challenge.c_time;
              this.createChallengeFormgroup.controls['venue'].setValue(this.state.state.challenge.c_location)
              this.mCreateChallengeRequest.c_location_id = this.state.state.challenge.c_location_id;
              this.mCreateChallengeRequest.c_location = this.state.state.challenge.c_location;
              this.teamSelect = this.state.state.challenge.c_invite;
              this.mCreateChallengeRequest.c_invite = this.teamSelect.map((x: any) => x.id).join(",")
              this.teamId = "," + this.mCreateChallengeRequest.c_invite + ","
              this.team_name = this.teamSelect.map((x: any) => x.grp_name).join(",")
              this.createChallengeFormgroup.controls['team'].setValue(this.team_name);
              this.refreesSelect = this.state.state.challenge.c_refree_id;
              console.log("refreeSelect", this.refreesSelect)
              this.mCreateChallengeRequest.c_refree_id = this.refreesSelect.map((x: any) => x.id).join(",")
              this.refreeId = "," + this.mCreateChallengeRequest.c_refree_id + ","
              this.refree_name = this.refreesSelect.map((x: any) => x.name).join(",")
              this.createChallengeFormgroup.controls['refree'].setValue(this.refree_name)
              this.challengeId = this.state.state.challenge.id;
            }
          });
        } else if (evt.url.includes("create-challenge-vs-group")) {
          this.update = false;
          this.activatedRoute.queryParams.subscribe(data => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
              this.state = this.router.getCurrentNavigation()?.extras.state;
              console.log("state", this.state)
              this.mCreateChallengeRequest.c_invite = this.state.state.group.id
              this.teamId = "," + this.mCreateChallengeRequest.c_invite + ","
              this.team_name = this.state.state.group.grp_name
              this.createChallengeFormgroup.controls['team'].setValue(this.team_name);

            }
          });
        } else {
          this.update = false;
          this.createChallengeFormgroup.controls['sport'].setValue("")
          this.createChallengeFormgroup.controls['title'].setValue("")
          this.createChallengeFormgroup.controls['description'].setValue("")
          this.createChallengeFormgroup.controls['venue'].setValue("")
          this.createChallengeFormgroup.controls['team'].setValue("")
          this.createChallengeFormgroup.controls['refree'].setValue("")
          this.mCreateChallengeRequest.c_invite = '';
          this.mCreateChallengeRequest.c_refree_id = '';
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
    this.wsList.getGroupList().toPromise().then(resTeam => {
      if (resTeam && resTeam.status) {
        this.mListGroupResponse.data = resTeam.data;
      } else {
        this.toast.error(resTeam.message);
      }
    }, error => {
      console.log("getVenueList error", error)
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
   * getVenueList used to get venue list
   * @param content 
   */
  getVenueList(content: any) {
    console.log("content", content)
    this.createChallengeVenue = true;
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
   * getTeamList used to get team list
   */
  getTeamList(content: any) {

    console.log("content", content)
    this.createChallengeTeam = true;
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
    this.createChallengeRefree = true;
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
    this.createChallengeVenue = false;
    this.createChallengeTeam = false;
    this.createChallengeRefree = false;
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
   *selectVenue used to select venue
   */
  selectVenue(venue: any) {
    console.log(venue);
    this.mCreateChallengeRequest.c_location_id = venue.id;
    this.mCreateChallengeRequest.c_location = venue.name;
    this.createChallengeFormgroup.controls['venue'].setValue(this.mCreateChallengeRequest.c_location)
  }
  /**
   * selectTeam used to select team
   * @param team 
   */
  selectTeam(team: any) {
    console.log(team);
    if (this.teamId.includes("," + team.id + ",")) {
      for (var i = 0; i < this.teamSelect.length; i++) {
        if (this.teamSelect[i].id == team.id) {
          this.teamSelect.splice(i, 1);
        }
      }
    } else {
      this.teamSelect.push(team);
    }
    console.log("teamId", this.teamId)
    this.mCreateChallengeRequest.c_invite = this.teamSelect.map((x: any) => x.id).join(",")
    this.teamId = "," + this.mCreateChallengeRequest.c_invite + ","
    this.team_name = this.teamSelect.map((x: any) => x.grp_name).join(",")
    console.log(this.mCreateChallengeRequest.c_refree_id)
    console.log(this.team_name)
    console.log(this.refreeId)
    this.createChallengeFormgroup.controls['team'].setValue(this.team_name)
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
    this.mCreateChallengeRequest.c_refree_id = this.refreesSelect.map((x: any) => x.id).join(",")
    this.refreeId = "," + this.mCreateChallengeRequest.c_refree_id + ","
    this.refree_name = this.refreesSelect.map((x: any) => x.fname + " " + x.lname).join(",")
    console.log(this.mCreateChallengeRequest.c_refree_id)
    console.log(this.refree_name)
    console.log(this.refreeId)
    this.createChallengeFormgroup.controls['refree'].setValue(this.refree_name)
  }

  /**
   * searchVenue used to search venue from searchbar
   * @param event 
   */
  searchVenue(event: any) {
    this.searchtoggle = true;
    console.log(event.target.value)
    this.searchVenueList = this.search(this.mListVenueResponse.data, event.target.value, 'venue');
    console.log(this.searchVenueList)
  }
  /**
   * searchTeam used to search team from searchbar
   * @param event 
   */
  searchTeam(event: any) {
    this.searchtoggle = true;
    console.log(event.target.value)
    this.searchTeamList = this.search(this.mListGroupResponse.data, event.target.value, 'team');
    console.log(this.searchTeamList)
  }
  /**
   * searchRefree used to search refree from searchbar
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
      }
    }
    return results;
  }
  /**
   * saveVenue used to save venue
   */
  saveVenue() {
    console.log(this.mCreateChallengeRequest.c_location_id)
    console.log(this.mCreateChallengeRequest.c_location)
    if (this.mCreateChallengeRequest.c_location == '' || this.mCreateChallengeRequest.c_location == undefined) {
      this.toast.error("Please select Venue!")
      this.modalService.hasOpenModals();
    } else {
      this.createChallengeFormgroup.controls['venue'].setValue(this.mCreateChallengeRequest.c_location)
      this.modalService.dismissAll();
    }
  }
  /**
   * saveTeam used to save team
   */
  saveTeam() {
    console.log(this.mCreateChallengeRequest.c_invite)
    if (this.mCreateChallengeRequest.c_invite == '' || this.mCreateChallengeRequest.c_invite == undefined) {
      this.toast.error("Please select Team!")
      this.modalService.hasOpenModals();
    } else {
      this.createChallengeFormgroup.controls['team'].setValue(this.team_name)
      this.modalService.dismissAll();
    }
  }
  /**
   * saveRefree used to save refree
   */
  saveRefree() {
    console.log(this.mCreateChallengeRequest.c_refree_id)
    console.log(this.mCreateChallengeRequest.c_invite)
    console.log(this.mCreateChallengeRequest.c_location)
    if (this.mCreateChallengeRequest.c_refree_id == '' || this.mCreateChallengeRequest.c_refree_id == undefined) {
      this.toast.error("Please select Refree!")
      this.modalService.hasOpenModals();
    } else {
      this.createChallengeFormgroup.controls['refree'].setValue(this.refree_name)
      this.modalService.dismissAll();
    }
  }
  /**
   * createNewChallenge used to create new challenge
   */
  createNewChallenge() {
    this.mCreateChallengeRequest.c_title = this.createChallengeFormgroup.controls["title"].value;
    this.mCreateChallengeRequest.c_desc = this.createChallengeFormgroup.controls["description"].value;
    this.mCreateChallengeRequest.c_sport_id = this.createChallengeFormgroup.controls["sport"].value;
    if (this.mCreateChallengeRequest.c_sport_id == '' || this.mCreateChallengeRequest.c_sport_id == undefined) {
      this.toast.error("Please select any sport for challenge!")
    } else if (this.mCreateChallengeRequest.c_location_id == null || this.mCreateChallengeRequest.c_location_id == undefined) {
      this.toast.error("Please enter challenge title!")
    } else if (this.mCreateChallengeRequest.c_title == '' || this.mCreateChallengeRequest.c_title == undefined) {
      this.toast.error("Please enter challenge title!")
    } else if (this.mCreateChallengeRequest.c_date == '' || this.mCreateChallengeRequest.c_date == undefined) {
      this.toast.error("Please enter challenge date!")
    } else if (this.mCreateChallengeRequest.c_time == '' || this.mCreateChallengeRequest.c_time == undefined) {
      this.toast.error("Please enter challenge time!")
    } else if (this.mCreateChallengeRequest.c_invite == '' || this.mCreateChallengeRequest.c_invite == undefined) {
      this.toast.error("Please select any team for challenge!")
    } else if (this.mCreateChallengeRequest.c_refree_id == '' || this.mCreateChallengeRequest.c_refree_id == undefined) {
      this.toast.error("Please select any refree for challenge!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateChallengeRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateChallengeRequest)
      this.wsList.createChallenge(this.mCreateChallengeRequest).toPromise().then(resCreateChallenge => {
        if (resCreateChallenge.success) {
          if (resCreateChallenge.success.status && resCreateChallenge.success.data.length > 0) {
            this.loaderShow = false;
            this.toast.success(resCreateChallenge.success.message);
            this.router.navigate(["/list"])
          } else {
            this.loaderShow = false;
            this.toast.error(resCreateChallenge.success.message);
          }
        } else {
          if (resCreateChallenge.status && resCreateChallenge.data.length > 0) {
            this.loaderShow = false;
            this.toast.error("Something went wrong!");
          } else {
            this.loaderShow = false;
            this.toast.error(resCreateChallenge.message);
          }
        }
      }, error => {
        this.loaderShow = false;
        console.log("createChallenge error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * updateChallenge used to update challenge
   */
  updateChallenge() {
    this.mCreateChallengeRequest.c_title = this.createChallengeFormgroup.controls["title"].value;
    this.mCreateChallengeRequest.c_desc = this.createChallengeFormgroup.controls["description"].value;
    this.mCreateChallengeRequest.c_sport_id = this.createChallengeFormgroup.controls["sport"].value;
    if (this.mCreateChallengeRequest.c_sport_id == '' || this.mCreateChallengeRequest.c_sport_id == undefined) {
      this.toast.error("Please select any sport for challenge!")
    } else if (this.mCreateChallengeRequest.c_location_id == null || this.mCreateChallengeRequest.c_location_id == undefined) {
      this.toast.error("Please enter challenge title!")
    } else if (this.mCreateChallengeRequest.c_title == '' || this.mCreateChallengeRequest.c_title == undefined) {
      this.toast.error("Please enter challenge title!")
    } else if (this.mCreateChallengeRequest.c_date == '' || this.mCreateChallengeRequest.c_date == undefined) {
      this.toast.error("Please enter challenge date!")
    } else if (this.mCreateChallengeRequest.c_time == '' || this.mCreateChallengeRequest.c_time == undefined) {
      this.toast.error("Please enter challenge time!")
    } else if (this.mCreateChallengeRequest.c_invite == '' || this.mCreateChallengeRequest.c_invite == undefined) {
      this.toast.error("Please select any team for challenge!")
    } else if (this.mCreateChallengeRequest.c_refree_id == '' || this.mCreateChallengeRequest.c_refree_id == undefined) {
      this.toast.error("Please select any refree for challenge!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mCreateChallengeRequest.user_id = parseInt(user, 10);
      console.log(this.mCreateChallengeRequest)
      this.wsList.updateSelectedChallenge(this.mCreateChallengeRequest, this.challengeId).toPromise().then(resUpdateChallenge => {
        if (resUpdateChallenge.status && resUpdateChallenge.data.length > 0) {
          this.loaderShow = false;
          this.toast.success(resUpdateChallenge.message);
          this.router.navigate(['/list'])
        } else {
          this.loaderShow = false;
          this.toast.error(resUpdateChallenge.message);
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
    this.mCreateChallengeRequest.c_date = date.split("T")[0];
    this.mCreateChallengeRequest.c_time = date.split("T")[1];
  }
  /**
   * selectTime used to select time format
   * @param time 
   */
  selectTime(time: any) {
    console.log(time)
    this.mCreateChallengeRequest.c_time = time;
  }
}
