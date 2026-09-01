import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SidebarService } from 'src/app/ws/sidebar.service';
import { WsForgotPasswordService } from 'src/app/ws/wsForgotPassword/ws-forgot-password.service';
import { sidebarAnimation, iconAnimation, labelAnimation } from '../animations';
import { MChangePasswordRequest } from '../forgot-password/forgot-password.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    sidebarAnimation(),
    iconAnimation(),
    labelAnimation(),
  ]
})
export class SidenavComponent implements OnInit {
  isExpanded: boolean = true;
  sidebarState: any;
  isShowing = false;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Input() iconOnly: boolean = true;
  userTypeId: any;
  updatePass: boolean = false;
  closeResult: any;
  updatePasswordFormgroup: FormGroup
  mChangePasswordRequest: MChangePasswordRequest = new MChangePasswordRequest();
  loaderShow: boolean = false;
  termshow: boolean = false;
  termsUrl: SafeResourceUrl | undefined;
  privacyUrl: SafeResourceUrl | undefined;
  url: string = 'https://tapamatch.com/api/terms-and-condition'
  privacyshow: boolean = false;
  pUrl: string = 'https://tapamatch.com/api/privacy-policy'
  constructor(public sanitizer: DomSanitizer, private wsForgotPassord: WsForgotPasswordService, private toast: ToastrService, private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private sidebarService: SidebarService) {
    this.sidebarState = 'close'
    this.updatePasswordFormgroup = this.formBuilder.group({
      old: [''],
      new: [''],
      confirm: ['']
    });
  }

  ngOnInit(): void {
    this.userTypeId = window.localStorage.getItem('user_type_id')
    this.sidebarService.sidebarStateObservable$.
      subscribe((newState: string) => {
        this.sidebarState = newState;
        console.log(this.sidebarState)
        window.localStorage.setItem('sidebarState', this.sidebarState)
      });
  }

  /**
   * open the url page to open
   * @param menuName 
   */
  openUrl(menuName: any) {
    if (menuName == "logout") {
      window.localStorage.setItem("auth", '')
      window.localStorage.setItem("id", '')
      window.localStorage.setItem("profile", '')
      window.localStorage.setItem("profiledata", '')
    }
  }
  /**
   * toggle sidebar nav
   */
  toggleSideNav() {
    this.sidebarService.toggle();
  }

  closeSideNav() {
    if (this.sidebarState == 'open') {
      this.sidebarService.toggle();
    }
  }
  /**
   * editPassword used to edit password
   * @param content 
   */
  editPassword(content: any) {
    this.closeSideNav();
    this.updatePass = true;
    this.updatePasswordFormgroup.controls['old'].setValue('');
    this.updatePasswordFormgroup.controls['new'].setValue('');
    this.updatePasswordFormgroup.controls['confirm'].setValue('');
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
  /**
   *  terms used to open terms and condition
   * @param content 
   */
  terms(content: any) {
    this.closeSideNav()
    this.termshow = true;
    this.termsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log("content", content)
    const config: NgbModalOptions = {
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
   * privacy used to open privacy policy
   * @param content 
   */
  privacy(content: any) {
    this.closeSideNav()
    this.privacyshow = true;
    this.privacyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pUrl);
    console.log("content", content)
    const config: NgbModalOptions = {
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
    this.updatePass = false;
    this.termshow = false;
    this.privacyshow = false;
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
   * updatePassword used to update password
   */
  updatePassword() {
    this.closeSideNav()
    this.mChangePasswordRequest.old_password = this.updatePasswordFormgroup.controls.old.value;
    this.mChangePasswordRequest.new_password = this.updatePasswordFormgroup.controls.new.value;
    const confirm_password = this.updatePasswordFormgroup.controls.confirm.value;
    if (this.mChangePasswordRequest.old_password == "" || this.mChangePasswordRequest.old_password == undefined) {
      this.toast.error("Please enter Old Password!");
      this.modalService.hasOpenModals();
    } else if (this.mChangePasswordRequest.new_password == "") {
      this.toast.error("Please Enter New Password!");
      this.modalService.hasOpenModals();
    } else if (confirm_password == "") {
      this.toast.error("Please Enter Confirm Password!");
      this.modalService.hasOpenModals();
    } else if (confirm_password != this.mChangePasswordRequest.new_password) {
      this.toast.error("Confirm Password should match with New Password!");
      this.modalService.hasOpenModals();
    } else {
      this.loaderShow = true;
      this.wsForgotPassord.userChangePassword(this.mChangePasswordRequest).toPromise().then(response => {
        console.log("userForgotPassword response : ", response)
        if (response.status && response.status == 200) {
          this.loaderShow = false;
          this.toast.success(response.message);

          this.modalService.dismissAll();
        } else {
          this.loaderShow = false;
          this.toast.error(response.message);
          this.modalService.hasOpenModals();
        }
      }, error => {
        this.loaderShow = false;
        console.log("userChangePassword response error: ", error)
        this.toast.error(error);
      })
    }
  }
}
