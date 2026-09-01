import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-card-counts',
  templateUrl: './card-counts.component.html',
  styleUrls: ['./card-counts.component.scss']
})
export class CardCountsComponent implements OnInit {

  @Input()
  challenges!: any;
  @Input()
  upcomingEvent!: any;
  @Input()
  upcomingFriendly!: any;
  @Input()
  teamData!: any;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  /**
   * goToCreateTeam() used for navigation to create team
   */
  goToCreateTeam() {
    this.router.navigate(["/create-team"])
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

}
