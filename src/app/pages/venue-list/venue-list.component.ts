import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WsVenueListService } from 'src/app/ws/wsVenueList/ws-venue-list.service';
import { MVenueListResponse } from './venue-list.module';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  loaderShow: boolean = false;
  mVenueListResponse: MVenueListResponse = new MVenueListResponse();
  constructor(private toast: ToastrService, private wsVenues: WsVenueListService) { }

  ngOnInit(): void {
    this.getAllVenues();
  }
  /**
   * getAllVenues used to get all venues
   */
  getAllVenues() {
    this.loaderShow = true;
    this.wsVenues.getVenues().toPromise().then(resVenue => {
      this.mVenueListResponse.data = [];
      if (resVenue.status || resVenue.status == 200) {
        this.loaderShow = false;
        this.mVenueListResponse.data = resVenue.data;
      } else {
        this.loaderShow = false;
        this.toast.error(resVenue.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("getVenues error", error)
      this.toast.error(error);
    })
  }

}
