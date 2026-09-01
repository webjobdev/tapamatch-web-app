import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WsHomeService } from 'src/app/ws/wsHome/ws-home.service';
import { WsListService } from 'src/app/ws/wslist/ws-list.service';
import { MHomeResultResponse, MHomeUpcomingEventResponse, MHomeUpcomingFriendlyResponse, MHomeUserTeamResponse } from '../home/home.module';
import { MListChallengeResponse, MListEventResponse, MListFriendlyResponse } from './list.module';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  mListEventResponse: MListEventResponse = new MListEventResponse();
  mListChallengeResponse: MListChallengeResponse = new MListChallengeResponse();
  mListFriendlyResponse: MListFriendlyResponse = new MListFriendlyResponse();
  mListUpChallengeResponse: MListChallengeResponse = new MListChallengeResponse();
  mHomeResultResponse: MHomeResultResponse = new MHomeResultResponse();
  mHomeUpcomingFriendlyResponse: MHomeUpcomingFriendlyResponse = new MHomeUpcomingFriendlyResponse();
  mHomeUpcomingEventResponse: MHomeUpcomingEventResponse = new MHomeUpcomingEventResponse();
  mHomeUserTeamResponse: MHomeUserTeamResponse = new MHomeUserTeamResponse();
  closeResult: any;
  constructor(private modalService: NgbModal, private router: Router, private wsHome: WsHomeService, private toast: ToastrService, private wsList: WsListService) { }

  ngOnInit(): void {
    /**
     * api to get matches 
     */
    this.wsList.getEvents().toPromise().then(resEvent => {
      if (resEvent && resEvent.status) {
        this.mListEventResponse.data = resEvent.data;
      } else {
        this.toast.error(resEvent.message);
      }
    }, error => {
      console.log("getEvents error", error)
      this.toast.error(error?.error?.message);
    })
    this.wsHome.getUpcomingEvents().toPromise().then(resEvent => {
      if (resEvent && resEvent.status) {
        this.mHomeUpcomingEventResponse.data = resEvent.data;
      } else {
        this.toast.error(resEvent.message);
      }
    }, error => {
      console.log("getUpcomingEvents error", error)
      this.toast.error(error?.error?.message);
    })

    /**
     * api to get all the challenges
     */
    this.wsList.getChallenges().toPromise().then(resChallenge => {
      if (resChallenge && resChallenge.status) {
        this.mListChallengeResponse.data = resChallenge.data;
      } else {
        this.toast.error(resChallenge.message);
      }
    }, error => {
      console.log("getChallenges error", error)
      this.toast.error(error?.error?.message);
    })
    /**
     * api to get all the challenges
     */
    this.wsHome.getUpcomingChallenges().toPromise().then(resChallenge => {
      if (resChallenge && resChallenge.status) {
        this.mListUpChallengeResponse.data = resChallenge.data;
      } else {
        this.toast.error(resChallenge.message);
      }
    }, error => {
      console.log("getChallenges error", error)
      this.toast.error(error?.error?.message);
    })
    /**
     * api to get all friendly 
     */
    this.wsList.getFriendly().toPromise().then(resFriendly => {
      if (resFriendly && resFriendly.status) {
        this.mListFriendlyResponse.data = resFriendly.data;
      } else {
        this.toast.error(resFriendly.message);
      }
    }, error => {
      console.log("getFriendly error", error)
      this.toast.error(error?.error?.message);
    })

    this.wsHome.getMatchResult().toPromise().then(resMatchResult => {
      if (resMatchResult && resMatchResult.status) {
        this.mHomeResultResponse.data = resMatchResult.data;
      } else {
        this.toast.error(resMatchResult.message);
      }
    }, error => {
      console.log("getMatchResult error", error)
      this.toast.error(error?.error?.message);
    })
    this.wsHome.getUpcomingFriendly().toPromise().then(resFriendly => {
      if (resFriendly && resFriendly.status) {
        this.mHomeUpcomingFriendlyResponse.data = resFriendly.data;
      } else {
        this.toast.error(resFriendly.message);
      }
    }, error => {
      console.log("getUpcomingFriendly error", error)
      this.toast.error(error?.error?.message);
    })

    this.wsHome.getUserTeam().toPromise().then(resTeam => {
      if (resTeam && resTeam.status) {
        this.mHomeUserTeamResponse.data = [];
        console.log("resTeam", resTeam)
        this.mHomeUserTeamResponse.data = resTeam.data;
      } else {
        this.toast.error(resTeam.message);
      }
    }, error => {
      console.log("getUserTeam error", error)
      this.toast.error(error?.error?.message);
    })
  }
  /**
   * goToCreateChallenge used to go to create challenge page
   */
  goToCreateChallenge() {
    this.router.navigate(["/create-challenge"])
  }
  /**
   * goToCreateFriendly used to go to create friendly page
   */
  goToCreateFriendly() {
    this.router.navigate(["/create-friendly"])
  }
  /**
   * goToCreateEvent used to go to create match page
   */
  goToCreateEvent() {
    this.router.navigate(["/create-match"])
  }
  /**
   * goToCreateTeam() used for navigation to create team
   */
  goToCreateTeam() {
    this.router.navigate(["/create-team"])
  }
  /**
   * updateChallenge used to redirect update challenge form page
   * @param challenge 
   */
  updateChallenge(challenge: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        challenge: challenge
      },
    };
    this.router.navigate(["/update-challenge"], { state: navigationExtras })
  }
  /**
   * updateFriendly used to redirect update friendly form page
   * @param friendly 
   */
  updateFriendly(friendly: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        friendly: friendly
      },
    };
    this.router.navigate(["/update-friendly"], { state: navigationExtras })
  }
  /**
   * updateEvent used to redirect update event form page
   * @param event 
   */
  updateEvent(event: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        event: event
      },
    };
    this.router.navigate(["/update-match"], { state: navigationExtras })
  }
  /**
  * updateTeam() used to navigate to update team
  * @param team 
  */
  updateTeam(team: any) {
    console.log("team", team)
    const navigationExtras: NavigationExtras = {
      state: {
        team: team
      },
    };
    this.router.navigate(["/update-team"], { state: navigationExtras })
  }

  seeMore(content: any) {
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

  close() {
    this.modalService.dismissAll();
  }

  /**
  * getDismissReason used to close modal
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

}
