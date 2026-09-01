import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MVenueListRequestData } from '../pages/venue-list/venue-list.module';
import { WsVenueListService } from '../ws/wsVenueList/ws-venue-list.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {
  @Input()
  challenges!: any;
  @Input()
  upcomingEvent!: any;
  @Input()
  upcomingFriendly!: any;
  @Input()
  leaderboard!: any;
  @Input()
  result!: any;
  @Input()
  venue!: any;
  @Input()
  single!: any;
  groups: any;
  singleVenuebool: boolean = false;
  closeResult: string = '';
  singleVenue: any;
  venueFormgroup: FormGroup
  loaderShow: boolean = false;
  mVenueListRequestData: MVenueListRequestData = new MVenueListRequestData();
  constructor(private toast: ToastrService, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder, private wsVenues: WsVenueListService) {
    this.venueFormgroup = this.formBuilder.group({
      monday_open: [''],
      monday_close: [''],
      tuesday_open: [''],
      tuesday_close: [''],
      wednesday_open: [''],
      wednesday_close: [''],
      thursday_open: [''],
      thursday_close: [''],
      friday_open: [''],
      friday_close: [''],
      saturday_open: [''],
      saturday_close: [''],
      sunday_open: [''],
      sunday_close: [''],
      price: [''],
      onoff: ['']
    });
  }

  ngOnInit(): void {
    console.log(this.venue)
  }
  /**
   * goToListPage() used to go to challenge , event , friendly and result list
   */
  goToListPage() {
    this.router.navigate(["/list"])
  }
  /**
   * createNewChallenge() used to redirect to create challenge form
   */
  createNewChallenge() {
    this.router.navigate(["/create-challenge"])
  }
  /**
   * createNewFriendly() used to redirect to create friendly form
   */
  createNewFriendly() {
    this.router.navigate(["/create-friendly"])
  }
  /**
  * createNewEvent() used to redirect to create event form
  */
  createNewEvent() {
    this.router.navigate(["/create-match"])
  }
  /**
   * openVenue() is used to open the modal of venue to update
   * @param content 
   * @param selectedVenue 
   */
  openVenue(content: any, selectedVenue: any) {
    this.venueFormgroup.controls['monday_open'].setValue(selectedVenue.monday_open ? selectedVenue.monday_open : '')
    this.venueFormgroup.controls['monday_close'].setValue(selectedVenue.monday_close ? selectedVenue.monday_open : '')
    this.venueFormgroup.controls['tuesday_open'].setValue(selectedVenue.tuesday_open ? selectedVenue.tuesday_open : '')
    this.venueFormgroup.controls['tuesday_close'].setValue(selectedVenue.tuesday_close ? selectedVenue.tuesday_close : '')
    this.venueFormgroup.controls['wednesday_open'].setValue(selectedVenue.wednesday_open ? selectedVenue.wednesday_open : '')
    this.venueFormgroup.controls['wednesday_close'].setValue(selectedVenue.wednesday_close ? selectedVenue.wednesday_close : '')
    this.venueFormgroup.controls['thursday_open'].setValue(selectedVenue.thursday_open ? selectedVenue.thursday_open : '')
    this.venueFormgroup.controls['thursday_close'].setValue(selectedVenue.thursday_close ? selectedVenue.thursday_close : '')
    this.venueFormgroup.controls['friday_open'].setValue(selectedVenue.friday_open ? selectedVenue.friday_open : '')
    this.venueFormgroup.controls['friday_close'].setValue(selectedVenue.friday_close ? selectedVenue.friday_close : '')
    this.venueFormgroup.controls['saturday_open'].setValue(selectedVenue.saturday_open ? selectedVenue.saturday_open : '')
    this.venueFormgroup.controls['saturday_close'].setValue(selectedVenue.saturday_close ? selectedVenue.saturday_close : '')
    this.venueFormgroup.controls['sunday_open'].setValue(selectedVenue.sunday_open ? selectedVenue.sunday_open : '')
    this.venueFormgroup.controls['sunday_close'].setValue(selectedVenue.sunday_close ? selectedVenue.sunday_close : '')
    this.venueFormgroup.controls['price'].setValue(selectedVenue.price ? selectedVenue.price : '0')
    this.venueFormgroup.controls['onoff'].setValue(selectedVenue.status == 1 ? 1 : 0)
    this.mVenueListRequestData.status = selectedVenue.status == 1 ? 1 : 0
    const config: NgbModalOptions = {
      backdrop: 'static',
      windowClass: 'slideInUp'
    };
    this.modalService.open(content, config).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**
   * getDismissReason() used for getting the event of modal close
   * @param reason 
   * @returns 
   */
  getDismissReason(reason: any): string {
    this.singleVenuebool = false;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log("BACKDROP_CLICK", reason)
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /**
   * saveVenue() used for updating the venue details
   * @param venueId 
   */
  saveVenue(venueId: any) {
    this.loaderShow = true;
    this.mVenueListRequestData.monday_open = this.venueFormgroup.controls['monday_open'].value;
    this.mVenueListRequestData.monday_close = this.venueFormgroup.controls['monday_close'].value;
    this.mVenueListRequestData.tuesday_open = this.venueFormgroup.controls['tuesday_open'].value;
    this.mVenueListRequestData.tuesday_close = this.venueFormgroup.controls['tuesday_close'].value;
    this.mVenueListRequestData.wednesday_open = this.venueFormgroup.controls['wednesday_open'].value;
    this.mVenueListRequestData.wednesday_close = this.venueFormgroup.controls['wednesday_close'].value;
    this.mVenueListRequestData.thursday_open = this.venueFormgroup.controls['thursday_open'].value;
    this.mVenueListRequestData.thursday_close = this.venueFormgroup.controls['thursday_close'].value;
    this.mVenueListRequestData.friday_open = this.venueFormgroup.controls['friday_open'].value;
    this.mVenueListRequestData.friday_close = this.venueFormgroup.controls['friday_close'].value;
    this.mVenueListRequestData.saturday_open = this.venueFormgroup.controls['saturday_open'].value;
    this.mVenueListRequestData.saturday_close = this.venueFormgroup.controls['saturday_close'].value;
    this.mVenueListRequestData.sunday_open = this.venueFormgroup.controls['sunday_open'].value;
    this.mVenueListRequestData.sunday_close = this.venueFormgroup.controls['sunday_close'].value;
    this.mVenueListRequestData.price = this.venueFormgroup.controls['price'].value;
    this.mVenueListRequestData.venue_id = venueId;
    this.wsVenues.updateVenue(this.mVenueListRequestData).toPromise().then(resUpdateVenue => {
      if (resUpdateVenue.status || resUpdateVenue.status == 200) {
        this.loaderShow = false;
        this.modalService.dismissAll();
        window.location.reload();
      } else {
        this.loaderShow = false;
        this.toast.error(resUpdateVenue.message);
      }
    }, error => {
      this.loaderShow = false;
      this.toast.error(error);
    })
  }
  /**
   * onOff() used to make venue active/inactive
   * @param event 
   */
  onOff(event: any) {
    console.log(event)
    if (event.target.checked == true) {
      this.mVenueListRequestData.status = 1
    } else {
      this.mVenueListRequestData.status = 0
    }
  }
  /**
   * createChallenge() used to create new challenge for specific group
   * @param group 
   */
  createChallenge(group: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        group: group
      },
    };
    this.router.navigate(["/create-challenge-vs-group"], { state: navigationExtras })
  }

}
