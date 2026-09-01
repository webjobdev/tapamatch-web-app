import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WsHomeService } from '../../ws/wsHome/ws-home.service';
import * as _ from 'lodash';
import { MHomeBannerResponse, MHomeCreatePostRequest, MHomeCreatePostResponse, MHomeLeaderBoardResponse, MHomeLeaderBoardResponseData, MHomePostResponse, MHomeResultResponse, MHomeUpcomingChallengeResponse, MHomeUpcomingEventResponse, MHomeUpcomingFriendlyResponse, MHomeUpcomingFriendlyResponseData, MHomeUserTeamResponse } from './home.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  challenges!: any;
  upcomingEvent!: any;
  upcomingFriendly!: any;
  leaderboard!: any;
  result!: any;
  banner_image: any;
  selectedIndex = 0;
  mHomeLeaderBoardResponse: MHomeLeaderBoardResponse = new MHomeLeaderBoardResponse();
  mHomeUpcomingChallengeResponse: MHomeUpcomingChallengeResponse = new MHomeUpcomingChallengeResponse();
  mHomeUpcomingEventResponse: MHomeUpcomingEventResponse = new MHomeUpcomingEventResponse();
  mHomeUpcomingFriendlyResponse: MHomeUpcomingFriendlyResponse = new MHomeUpcomingFriendlyResponse();
  mHomeBannerResponse: MHomeBannerResponse = new MHomeBannerResponse();
  mHomePostResponse: MHomePostResponse = new MHomePostResponse();
  mHomeResultResponse: MHomeResultResponse = new MHomeResultResponse();
  mHomeCreatePostRequest: MHomeCreatePostRequest = new MHomeCreatePostRequest();
  mHomeCreatePostResponse: MHomeCreatePostResponse = new MHomeCreatePostResponse();
  mHomeUserTeamResponse: MHomeUserTeamResponse = new MHomeUserTeamResponse();
  user_profile: any;
  closeResult = '';
  selectVideoImage: any = '';
  imageError!: string;
  createPostForm: FormGroup;
  type: any;
  loaderShow: boolean = false;
  @ViewChild('videoPlayer') videoplayer: any;
  public startedPlay: boolean = false;
  public show: boolean = false;
  content: any;
  profileData: any;
  profile: any;
  constructor(private router: Router, private wsHome: WsHomeService, private toast: ToastrService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.createPostForm = this.formBuilder.group({
      content: [''],
      image: ['']
    });

  }

  ngOnInit(): void {
    this.loaderShow = true;
    this.user_profile = window.localStorage.getItem("profile")
    this.profileData = window.localStorage.getItem("profiledata")
    this.profile = JSON.parse(this.profileData);
    console.log("profile", this.profile)

    /**
     * api to get banner images 
     */
    this.wsHome.getBanner().toPromise().then(resBanner => {
      this.mHomeBannerResponse.data = []
      if (resBanner && resBanner.status) {
        this.mHomeBannerResponse.data = resBanner.data;
      } else {
        this.toast.error("Something went wrong!");
        this.mHomeBannerResponse.data = [];
      }
    }, error => {
      console.log("getBanner error", error)
      this.toast.error(error?.error?.message);
      this.mHomeBannerResponse.data = [];
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
    /**
     * api to get leaderboard details
     */
    this.wsHome.getLeaderBoard().toPromise().then(resBoard => {
      this.mHomeLeaderBoardResponse.data = [];
      if (resBoard && resBoard.data) {
        this.mHomeLeaderBoardResponse.data = resBoard.data;
      } else {
        this.toast.error("Something went wrong!");
        this.mHomeLeaderBoardResponse.data = new MHomeLeaderBoardResponseData();
      }
    }, error => {
      console.log("getLeaderBoard error", error)
      this.toast.error(error?.error?.message);
    })
    /**
     * api to get upcoming matches
     */
    this.wsHome.getUpcomingEvents().toPromise().then(resEvent => {
      this.mHomeUpcomingEventResponse.data = [];
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
     * api to get upcoming challenges
     */
    this.wsHome.getUpcomingChallenges().toPromise().then(resChallenge => {
      this.mHomeUpcomingChallengeResponse.data = [];
      if (resChallenge && resChallenge.status) {
        this.mHomeUpcomingChallengeResponse.data = resChallenge.data;
      } else {
        this.toast.error(resChallenge.message);
      }
    }, error => {
      console.log("getUpcomingChallenges error", error)
      this.toast.error(error?.error?.message);
    })
    /**
     * api to get upcoming friendly
     */
    this.wsHome.getUpcomingFriendly().toPromise().then(resFriendly => {
      this.mHomeUpcomingFriendlyResponse.data = []
      if (resFriendly && resFriendly.status) {
        this.mHomeUpcomingFriendlyResponse.data = resFriendly.data;
      } else {
        this.toast.error(resFriendly.message);
      }
    }, error => {
      console.log("getUpcomingFriendly error", error)
      this.toast.error(error?.error?.message);
    })
    /**
     * api to get match result
     */
    this.wsHome.getMatchResult().toPromise().then(resMatchResult => {
      this.mHomeResultResponse.data = {}
      if (resMatchResult && resMatchResult.status) {
        this.mHomeResultResponse.data = resMatchResult.data;
      } else {
        this.toast.error(resMatchResult.message);
      }
    }, error => {
      console.log("getMatchResult error", error)
      this.toast.error(error?.error?.message);
    })
    /**
     * api to get posts of all the user
     */
    this.wsHome.getPosts("1").toPromise().then(resPosts => {
      this.mHomePostResponse.data = []
      if (resPosts && resPosts.data) {
        this.mHomePostResponse.data = resPosts.data;
      } else {
        this.toast.error("Something went Wrong!");
      }
    }, error => {
      console.log("getPosts error", error)
      this.toast.error(error?.error?.message);
    })

    this.loaderShow = false;
  }
  /**
   * open modal to create a new post
   * @param content 
   */
  open(content: any) {
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
   * api to save a post after all details filled
   */
  savePost() {
    console.log("this.createPostForm.controls.content.value", this.createPostForm.controls.content.value)
    if (this.createPostForm.controls.content.value == "" || this.content == "") {
      this.toast.error("Please enter Description!")
      this.modalService.hasOpenModals();
    } else {
      console.log("done")
      this.loaderShow = true;
      this.mHomeCreatePostRequest.content = this.createPostForm.controls.content.value;
      if (this.createPostForm.controls.image.value != "") {
        this.mHomeCreatePostRequest.attachement = this.createPostForm.controls.image.value;
      }
      this.wsHome.createPost(this.mHomeCreatePostRequest).toPromise().then(postRes => {
        if (postRes && postRes.id) {
          this.modalService.dismissAll()
          this.toast.success("Post Created Successfully");
          this.wsHome.getPosts("1").toPromise().then(resPosts => {
            if (resPosts && resPosts.data) {
              this.mHomePostResponse.data = resPosts.data;
              this.loaderShow = false;
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              this.loaderShow = false;
              this.toast.error("Something went Wrong!");
            }
          }, error => {
            this.loaderShow = false;
            console.log("getPosts error", error)
            this.toast.error(error?.error?.message);
          })

        } else {
          this.toast.error("Error Creating Post!");
        }
      }, error => {
        console.log("createPost error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * dismiss existing modal
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
  /**
   * select video or image for new post
   * @param fileInput 
   * @returns 
   */
  preview(fileInput: any) {
    this.imageError = '';
    this.createPostForm.controls.image.setValue(fileInput.target.files[0])
    console.log(fileInput.target.files[0]);
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      this.type = fileInput.target.files[0].type;
      if (this.type.includes('video')) {
        return new Promise((resolve, reject) => {
          reader.readAsDataURL(fileInput.target.files[0]);
          reader.onload = (e: any) => {
            console.log(e.target.result)
            const videoBase64Path = e.target.result;
            this.selectVideoImage = videoBase64Path
            console.log("base64", this.selectVideoImage)
          };
          reader.onerror = error => reject(error);
        });
      } else {

        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const imgBase64Path = e.target.result;
            this.selectVideoImage = imgBase64Path;
            console.log("base64", this.selectVideoImage)
          };
        };
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  /**
   * pause the video
   * @param videoplayer 
   */
  pauseVideo(videoplayer: any) {
    videoplayer?.nativeElement?.pauseVideo();
  }
  /**
   * used to remove video to add new image or video
   */
  removeImageVideo() {
    this.selectVideoImage = '';
  }

}
