import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WsListService } from 'src/app/ws/wslist/ws-list.service';
import { WsNotificationService } from 'src/app/ws/wsNotification/ws-notification.service';
import { MListVenueResponse } from '../list/list.module';
import { MEventAcceptRejectRequest, MChallengeAcceptRejectRequest, MChallengeFriendlyAcceptRejectVenueRequest, MChallengeFriendlyChangeVenue, MFriendGroupInviteRequest, MFriendlyAcceptRejectRequest, MFriendRequestAcceptRejectRequest, MFriendRequestAcceptRejectResponse, MRefreeAcceptRejectRequest } from './notification.module';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  loaderShow: boolean = false;
  mNotificationListResponse: any = [];
  mFriendRequestAcceptRejectRequest: MFriendRequestAcceptRejectRequest = new MFriendRequestAcceptRejectRequest();
  mFriendRequestAcceptRejectResponse: MFriendRequestAcceptRejectResponse = new MFriendRequestAcceptRejectResponse();
  mFriendGroupInviteRequest: MFriendGroupInviteRequest = new MFriendGroupInviteRequest();
  mRefreeAcceptRejectRequest: MRefreeAcceptRejectRequest = new MRefreeAcceptRejectRequest();
  mChallengeAcceptRejectRequest: MChallengeAcceptRejectRequest = new MChallengeAcceptRejectRequest();
  mChallengeFriendlyAcceptRejectVenueRequest: MChallengeFriendlyAcceptRejectVenueRequest = new MChallengeFriendlyAcceptRejectVenueRequest();
  mFriendlyAcceptRejectRequest: MFriendlyAcceptRejectRequest = new MFriendlyAcceptRejectRequest();
  mEventAcceptRejectRequest: MEventAcceptRejectRequest = new MEventAcceptRejectRequest();
  selectVenueNew: boolean = false;
  closeResult: string = '';
  mListVenueResponse: MListVenueResponse = new MListVenueResponse();
  mChallengeFriendlyChangeVenue: MChallengeFriendlyChangeVenue = new MChallengeFriendlyChangeVenue();
  searchtoggle: boolean = false;
  searchVenueList: any = [];
  constructor(private wsList: WsListService, private modalService: NgbModal, private toast: ToastrService, private wsNotification: WsNotificationService) { }

  ngOnInit(): void {
    this.getAllNotification()
  }
  /**
   * getAllNotification used to get all notifications
   */
  getAllNotification() {
    this.loaderShow = true;
    this.wsNotification.getNotification().toPromise().then(resNotification => {
      if (resNotification.length > 0) {
        this.loaderShow = false;
        this.mNotificationListResponse = resNotification;
        console.log(this.mNotificationListResponse)
      } else {
        this.loaderShow = false;
        this.toast.error('Something went wrong!');
      }
    }, error => {
      this.loaderShow = false;
      console.log("getNotification error", error)
      this.toast.error(error);
    })
  }
  /**
   * accept used to accept the request using type
   * @param not 
   */
  accept(not: any) {
    if (not.type == 'friend_request') {
      const detail = JSON.parse(not.details);
      console.log(detail)
      this.mFriendRequestAcceptRejectRequest.receiver_id = window.localStorage.getItem('id')
      this.mFriendRequestAcceptRejectRequest.r_status = 'accept'
      this.mFriendRequestAcceptRejectRequest.user_id = detail.id;
      this.updateRequestFriend(this.mFriendRequestAcceptRejectRequest)
    }
    if (not.type == 'group_request') {
      const detail = JSON.parse(not.details);
      console.log(detail)
      this.mFriendGroupInviteRequest.group_id = detail.id;
      this.mFriendGroupInviteRequest.r_status = 'yes'
      this.mFriendGroupInviteRequest.user_id = window.localStorage.getItem('id');
      this.wsNotification.getWalletCheck().toPromise().then(resCheckWallet => {
        if (resCheckWallet.status || resCheckWallet.status == 200) {
          this.loaderShow = false;
          if (resCheckWallet.balance >= 2.5) {
            this.updateRequestTeam(this.mFriendGroupInviteRequest)
          } else {
            this.toast.error("Your wallet balance is low!");
          }
        } else {
          this.loaderShow = false;
          this.toast.error(resCheckWallet.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("getWalletCheck error", error)
        this.toast.error(error);
      })

    }
    if (not.type == 'challenge_refree_invitation' || not.type == 'friendly_refree_invitation') {

      this.mRefreeAcceptRejectRequest.approve = 'yes';
      if (not.type == 'challenge_refree_invitation') {
        const detail = JSON.parse(not.details);
        console.log(detail)
        this.mRefreeAcceptRejectRequest.challenge_id = detail.id;
        this.mRefreeAcceptRejectRequest.refree_id = window.localStorage.getItem('id');
      } else {
        const detail = not.details;
        this.mRefreeAcceptRejectRequest.friendly_id = detail.id;
        this.mRefreeAcceptRejectRequest.refree_id = window.localStorage.getItem('id');
      }
      this.mRefreeAcceptRejectRequest.user_id = window.localStorage.getItem('id');
      this.updateRequestRefree(this.mRefreeAcceptRejectRequest)
    }
    if (not.type == 'challenge_invitation' || not.type == 'friendly_invitation' || not.type == 'event_invitation') {

      if (not.type == 'challenge_invitation') {
        const detail = JSON.parse(not.details);
        console.log(detail)
        this.mChallengeAcceptRejectRequest.user_id = window.localStorage.getItem('id');
        this.mChallengeAcceptRejectRequest.approved = 'yes';
        this.mChallengeAcceptRejectRequest.challenge_id = detail.id;
        this.updateRequestChallenge(this.mChallengeAcceptRejectRequest)
      } else if (not.type == 'event_invitation') {
        const detail = not.details;
        console.log(detail)
        this.mEventAcceptRejectRequest.user_id = window.localStorage.getItem('id');
        this.mEventAcceptRejectRequest.status = '1';
        this.mEventAcceptRejectRequest.event_id = detail.id;
        this.updateRequestEvent(this.mEventAcceptRejectRequest)
      } else {
        const detail = not.details;
        this.mFriendlyAcceptRejectRequest.user_id = window.localStorage.getItem('id');
        this.mFriendlyAcceptRejectRequest.friendly_id = detail.id;
        this.mFriendlyAcceptRejectRequest.r_status = 'yes';
        this.updateRequestFriendly(this.mFriendlyAcceptRejectRequest)
      }
    }

    if (not.type == 'venue_request_for_challenge' || not.type == 'venue_request_for_friendly') {
      const detail = not.details;
      console.log(detail)
      this.mChallengeFriendlyAcceptRejectVenueRequest.status = 1;
      this.mChallengeFriendlyAcceptRejectVenueRequest.venue_invite_id = detail.id;
      if (not.type == 'venue_request_for_challenge') {
        this.updateRequestChallengeVenue(this.mChallengeFriendlyAcceptRejectVenueRequest)
      } else {
        this.updateRequestFriendlyVenue(this.mChallengeFriendlyAcceptRejectVenueRequest)
      }
    }

  }
  /**
   * reject used to reject the request as per type
   * @param not 
   */
  reject(not: any) {
    if (not.type == 'friend_request') {
      const detail = JSON.parse(not.details);
      console.log(detail)
      this.mFriendRequestAcceptRejectRequest.receiver_id = window.localStorage.getItem('id')
      this.mFriendRequestAcceptRejectRequest.r_status = 'reject'
      this.mFriendRequestAcceptRejectRequest.user_id = detail.id;
      this.updateRequestFriend(this.mFriendRequestAcceptRejectRequest)
    }
    if (not.type == 'group_request') {
      const detail = JSON.parse(not.details);
      console.log(detail)
      this.mFriendGroupInviteRequest.group_id = detail.id;
      this.mFriendGroupInviteRequest.r_status = 'no'
      this.mFriendGroupInviteRequest.user_id = window.localStorage.getItem('id');
      this.updateRequestTeam(this.mFriendGroupInviteRequest)
    }
    if (not.type == 'challenge_refree_invitation' || not.type == 'friendly_refree_invitation') {
      this.mRefreeAcceptRejectRequest.approve = 'no';
      if (not.type == 'challenge_refree_invitation') {
        const detail = JSON.parse(not.details);
        console.log(detail)
        this.mRefreeAcceptRejectRequest.challenge_id = detail.id;
        this.mRefreeAcceptRejectRequest.refree_id = detail.c_refree_id;
      } else {
        const detail = not.details;
        this.mRefreeAcceptRejectRequest.friendly_id = detail.id;
        this.mRefreeAcceptRejectRequest.refree_id = detail.frd_refree_id;
      }
      this.mRefreeAcceptRejectRequest.user_id = window.localStorage.getItem('id');
      this.updateRequestRefree(this.mRefreeAcceptRejectRequest)
    }
    if (not.type == 'challenge_invitation' || not.type == 'friendly_invitation' || not.type == 'event_invitation') {

      if (not.type == 'challenge_invitation') {
        const detail = JSON.parse(not.details);
        console.log(detail)
        this.mChallengeAcceptRejectRequest.user_id = window.localStorage.getItem('id');
        this.mChallengeAcceptRejectRequest.approved = 'no';
        this.mChallengeAcceptRejectRequest.challenge_id = detail.id;
        this.updateRequestChallenge(this.mChallengeAcceptRejectRequest)
      } else if (not.type == 'event_invitation') {
        const detail = not.details;
        console.log(detail)
        this.mEventAcceptRejectRequest.user_id = window.localStorage.getItem('id');
        this.mEventAcceptRejectRequest.status = '2';
        this.mEventAcceptRejectRequest.event_id = detail.id;
        this.updateRequestEvent(this.mEventAcceptRejectRequest)
      } else {
        const detail = not.details;
        this.mFriendlyAcceptRejectRequest.user_id = window.localStorage.getItem('id');
        this.mFriendlyAcceptRejectRequest.friendly_id = detail.id;
        this.mFriendlyAcceptRejectRequest.r_status = 'no';
        this.updateRequestFriendly(this.mFriendlyAcceptRejectRequest)
      }
    }
    if (not.type == 'venue_request_for_challenge' || not.type == 'venue_request_for_friendly') {
      const detail = not.details;
      console.log(detail)
      this.mChallengeFriendlyAcceptRejectVenueRequest.status = 2;
      this.mChallengeFriendlyAcceptRejectVenueRequest.venue_invite_id = detail.id;
      if (not.type == 'venue_request_for_challenge') {
        this.updateRequestChallengeVenue(this.mChallengeFriendlyAcceptRejectVenueRequest)
      } else {
        this.updateRequestFriendlyVenue(this.mChallengeFriendlyAcceptRejectVenueRequest)
      }
    }
  }
  /**
   * updateRequestFriend used to updaye friend Request
   * @param friendRequest 
   */
  updateRequestFriend(friendRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateFriendRequest(friendRequest).toPromise().then(resFriendRequest => {
      if (resFriendRequest.status || resFriendRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resFriendRequest.message)
        this.getAllNotification();

      } else {
        this.loaderShow = false;
        this.toast.error(resFriendRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateRequestFriend error", error)
      this.toast.error(error);
    })
  }
  /**
   * updateRequestTeam used to update team request
   * @param teamRequest 
   */
  updateRequestTeam(teamRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateTeamRequest(teamRequest).toPromise().then(resTeamRequest => {
      if (resTeamRequest.status || resTeamRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resTeamRequest.message)
        this.getAllNotification();
      } else {
        this.loaderShow = false;
        this.toast.error(resTeamRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateTeamRequest error", error)
      this.toast.error(error);
    })
  }
  /**
   * updateRequestRefree used to updaye refree request
   * @param refreeRequest 
   */
  updateRequestRefree(refreeRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateRefreeRequest(refreeRequest).toPromise().then(resRefreeRequest => {
      if (resRefreeRequest.status || resRefreeRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resRefreeRequest.message)
        this.getAllNotification();
      } else {
        this.loaderShow = false;
        this.toast.error(resRefreeRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateRequestRefree error", error)
      this.toast.error(error);
    })
  }
  /**
   * updateRequestChallenge used to update challenge request
   * @param challengeRequest 
   */
  updateRequestChallenge(challengeRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateChallengeRequest(challengeRequest).toPromise().then(resChallengeRequest => {
      if (resChallengeRequest.status || resChallengeRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resChallengeRequest.message)
        this.getAllNotification();
      } else {
        this.loaderShow = false;
        this.toast.error(resChallengeRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateChallengeRequest error", error)
      this.toast.error(error);
    })
  }
  /**
   * updateRequestFriendly used to update friendly request
   * @param friendlyRequest 
   */
  updateRequestFriendly(friendlyRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateFriendlyRequest(friendlyRequest).toPromise().then(resFriendlyRequest => {
      if (resFriendlyRequest.status || resFriendlyRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resFriendlyRequest.message)
        this.getAllNotification();
      } else {
        this.loaderShow = false;
        this.toast.error(resFriendlyRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateFriendlyRequest error", error)
      this.toast.error(error);
    })
  }

  /**
   * updateRequestFriendly used to update friendly request
   * @param friendlyRequest 
   */
  updateRequestEvent(eventRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateEventRequest(eventRequest).toPromise().then(resEventRequest => {
      if (resEventRequest.status || resEventRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resEventRequest.message)
        this.getAllNotification();
      } else {
        this.loaderShow = false;
        this.toast.error(resEventRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateRequestEvent error", error)
      this.toast.error(error);
    })
  }
  /**
   * updateRequestFriendlyVenue used to update friendly venue request
   * @param venueFriendlyRequest 
   */
  updateRequestFriendlyVenue(venueFriendlyRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateFriendlyVenueRequest(venueFriendlyRequest).toPromise().then(resVenueFriendlyRequest => {
      if (resVenueFriendlyRequest.status || resVenueFriendlyRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resVenueFriendlyRequest.message)
        this.getAllNotification();
      } else {
        this.loaderShow = false;
        this.toast.error(resVenueFriendlyRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateRequestFriendlyVenue error", error)
      this.toast.error(error);
    })
  }
  /**
   * updateRequestChallengeVenue used to update challenge request venue
   * @param venueChallengeRequest 
   */
  updateRequestChallengeVenue(venueChallengeRequest: any) {
    this.loaderShow = true;
    this.wsNotification.updateChallengeVenueRequest(venueChallengeRequest).toPromise().then(resVenueChallengeRequest => {
      if (resVenueChallengeRequest.status || resVenueChallengeRequest.status == 200) {
        this.loaderShow = false;
        this.toast.success(resVenueChallengeRequest.message)
        this.getAllNotification();
      } else {
        this.loaderShow = false;
        this.toast.error(resVenueChallengeRequest.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("updateRequestChallengeVenue error", error)
      this.toast.error(error);
    })
  }
  /**
   * setValue used to set the value of score
   * @param type 
   * @param not 
   * @param matchType 
   * @returns 
   */
  setValue(type: any, not: any, matchType: any) {
    if (not.details.id && !not.details.challenge && !not.details.friendly) {
      var details = not.details;
    } else if (not.details.challenge) {
      var details = not.details.challenge;
    } else if (not.details.friendly) {
      var details = not.details.friendly;
    } else {
      var details = JSON.parse(not.details);
    }

    if (type == "team_a") {
      if (not.type.includes("challenge")) {
        if (details.team_a != null) {
          return details.team_a.grp_name;
        } else {
          return 'Pending'
        }
      } else {
        if (details.user_a != null) {
          return details.user_a.fname + " " + details.user_a.lname;
        } else {
          return 'Pending'
        }
      }
    } else if (type == "team_b") {
      if (not.type.includes("challenge")) {
        if (details.team_b != null) {
          return details.team_b.group.grp_name;
        } else {
          return 'Pending'
        }
      } else {
        if (details.user_b != null) {
          return details.user_b.fname + " " + details.user_b.lname;
        } else {
          return 'Pending'
        }
      }
    } else if (type == "sport") {
      if (details.sports != null) {
        return details.sports.sport_name;
      } else {
        return 'Pending'
      }
    } else if (type == "location") {
      if (not.type.includes("challenge")) {
        if (details.c_location != null) {
          return details.c_location;
        } else {
          return 'Pending'
        }
      } else {
        if (details.frd_location != null) {
          return details.frd_location;
        } else {
          return 'Pending'
        }
      }
    } else if (type == "date") {
      if (not.type.includes("challenge")) {
        if (details.c_date != null) {
          return details.c_date;
        } else {
          return 'Pending'
        }
      } else {
        if (details.frd_date != null) {
          return details.frd_date;
        } else {
          return 'Pending'
        }
      }
    } else if (type == "time") {
      if (not.type.includes("challenge")) {
        if (details.c_time != null) {
          return details.c_time;
        } else {
          return 'Pending'
        }
      } else {
        if (details.frd_time != null) {
          return details.frd_time;
        } else {
          return 'Pending'
        }
      }
    } else if (type == "refree") {
      if (details.accepted_referee != null) {
        return details.accepted_referee.user.fname + " " + details.accepted_referee.user.lname;
      } else {
        return 'Pending'
      }
    }
  }
  /**
   * getVenueList used to get venue list
   * @param content 
   * @param not 
   */
  getVenueList(content: any, not: any) {
    console.log(not)
    this.mChallengeFriendlyChangeVenue.venue_id = not.details.venue_id
    if (not.type == "venue_request_for_challenge_rejected") {
      this.mChallengeFriendlyChangeVenue.challenge_id = not.details.challenge_id;
    } else {
      this.mChallengeFriendlyChangeVenue.friendly_id = not.details.friendly_id;
    }
    this.mChallengeFriendlyChangeVenue.notification_id = not.notification_id;

    console.log("content", this.mChallengeFriendlyChangeVenue)
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
    this.selectVenueNew = true;
    const config: NgbModalOptions = {
      backdrop: 'static',

      windowClass: 'slideInUp'
    };
    this.modalService.open(content, config).result.then((result) => {
      console.log("Closed with:", result)
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log("Dismissed", reason)
      this.closeResult = `Dismissed ${this.getDismissReason(reason, not)}`;
    });
  }
  /**
   * getDismissReason used to close modal
   * @param reason 
   * @param not 
   * @returns 
   */
  getDismissReason(reason: any, not: any): string {
    this.mChallengeFriendlyChangeVenue.venue_id = not.details.venue_id;
    this.selectVenueNew = false;
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
   * selectVenue used to select venue
   * @param venue 
   */
  selectVenue(venue: any) {
    console.log(venue);
    this.mChallengeFriendlyChangeVenue.venue_id = venue.id;
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
   * search search by venue name
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
      if ((entry && entry.name && entry.name.toUpperCase().indexOf(name) !== -1)) {
        results.push(entry);
      }
    }
    return results;
  }
  /**
   * saveVenue used to update venue
   */
  saveVenue() {
    console.log(this.mChallengeFriendlyChangeVenue)
    console.log(this.mChallengeFriendlyChangeVenue.challenge_id)
    if (this.mChallengeFriendlyChangeVenue.challenge_id != "" && this.mChallengeFriendlyChangeVenue.challenge_id != null && this.mChallengeFriendlyChangeVenue.challenge_id != undefined && this.mChallengeFriendlyChangeVenue.challenge_id != 'undefined') {
      this.wsNotification.updateChallengeNewVenueRequest(this.mChallengeFriendlyChangeVenue).toPromise().then(resVenue => {
        if (resVenue && resVenue.status) {
          this.toast.success(resVenue.message);
          this.modalService.dismissAll();
          this.getAllNotification();
        } else {
          this.toast.error(resVenue.message);
          this.modalService.hasOpenModals();
        }
      }, error => {
        console.log("updateChallengeNewVenueRequest error", error)
        this.toast.error(error?.error?.message);
        this.modalService.hasOpenModals();
      })
    } else {
      this.wsNotification.updateFriendlyNewVenueRequest(this.mChallengeFriendlyChangeVenue).toPromise().then(resVenue => {
        if (resVenue && resVenue.status) {
          this.toast.success(resVenue.message);
          this.modalService.dismissAll();
          this.getAllNotification();
        } else {
          this.toast.error(resVenue.message);
          this.modalService.hasOpenModals();
        }
      }, error => {
        console.log("updateFriendlyNewVenueRequest error", error)
        this.toast.error(error?.error?.message);
        this.modalService.hasOpenModals();
      })
    }
  }
}
