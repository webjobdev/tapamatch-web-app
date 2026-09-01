import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { SidebarService } from './ws/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'TapAMatch';
  sideBarOpen = true;
  sidebar: boolean = false;
  sidebarState: any;
  constructor(private router: Router, private sidebarService: SidebarService) {
    this.sidebarService.sidebarStateObservable$.
      subscribe((newState: string) => {
        this.sidebarState = newState;
        console.log(this.sidebarState)
      });
    firebase.initializeApp(environment.firebase)
    this.router.events.subscribe((evt) => {

      if (evt instanceof NavigationEnd) {
        console.log("url", evt.url);
        console.log("window.localStorage.getItem", window.localStorage.getItem("id"));
        var id = window.localStorage.getItem("id")
        var keepSigned = window.localStorage.getItem("keepSigned");
        console.log("id", id)
        if (evt.url.includes("login") || evt.url.includes("signup") || evt.url.includes("forgotpassword") || evt.url == '/') {
          if ((id && (id != undefined || id != 'undefined' || id != '' || id != null || id != 'null')) && (keepSigned && (keepSigned != undefined || keepSigned != 'undefined' || keepSigned != '' || keepSigned != null || keepSigned != 'null'))) {
            console.log("home")
            this.router.navigate(["home"]);
            this.sidebar = true;
          } else {
            this.sidebar = false;
          }
        } else {
          this.sidebar = true;
        }
      }
    })
  }

  /**
   * sidebar toggle close/open
   */
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
