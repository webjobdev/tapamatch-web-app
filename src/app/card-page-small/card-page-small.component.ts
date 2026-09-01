import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MHomeCreateCommentRequest, MHomeCreatePostRequest, MHomeCreatePostResponse, MHomeLikeRequest, MHomeLikeResponse, MHomePostResponse } from '../pages/home/home.module';
import { WsHomeService } from '../ws/wsHome/ws-home.service';
import { WsProfileService } from '../ws/wsProfile/ws-profile.service';

@Component({
  selector: 'app-card-page-small',
  templateUrl: './card-page-small.component.html',
  styleUrls: ['./card-page-small.component.scss']
})
export class CardPageSmallComponent implements OnInit {
  @Input()
  posts!: any;
  @Input()
  userposts!: any;
  @Input()
  feedposts!: any;
  mHomeLikeReq: MHomeLikeRequest = new MHomeLikeRequest();
  mHomeLikeRes: MHomeLikeResponse = new MHomeLikeResponse();
  mHomePostResponse: MHomePostResponse = new MHomePostResponse();
  mHomeCreateCommentRequest: MHomeCreateCommentRequest = new MHomeCreateCommentRequest();
  @ViewChild('videoPlayer') videoplayer: any;
  public startedPlay: boolean = false;
  public show: boolean = false;
  user_profile: any;
  comment: any;
  closeResult: string = '';
  singlePost: any;
  likeStatus: any;
  loaderShow: boolean = false;
  pageNo: number = 1
  last_page: number = -1;
  @ViewChild('yourElement') yourElement!: ElementRef<HTMLInputElement>;
  showButton: boolean = true;
  showNoItem: boolean = false;
  url: any;
  constructor(private router: Router, private wsHome: WsHomeService, private toast: ToastrService, private wsProfile: WsProfileService, private modalService: NgbModal) {
    this.user_profile = window.localStorage.getItem("profile");
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        console.log("url", evt.url);
        this.url = evt.url;
      }
    });
  }

  ngOnInit(): void {
    this.showButton = true;
  }


  ngAfterViewInit() {
    console.log(this.url)
    if (this.url == '/feeds') {
      this.createObserver(true);
    }
  }
  /**
   * split date time into date
   * @param created_at 
   * @returns 
   */
  getDate(created_at: any) {
    return created_at.split(" ")[0]
  }
  /**
   * videoplayer to play a video in post
   * @param videoplayer 
   */
  pauseVideo(videoplayer: any) {
    videoplayer?.nativeElement?.pauseVideo();
  }
  /**
   * Api to call like and unlikw post
   * @param postId 
   */
  likeUnlikePost(postId: any, type: any) {
    this.likeStatus = postId + type;
    this.mHomeLikeReq.post_id = postId;
    this.wsHome.likeUnlike(this.mHomeLikeReq).toPromise().then(likeUnlikeRes => {
      if (likeUnlikeRes && likeUnlikeRes.message) {
        this.getPostsCall();
      } else {
        this.toast.error("Something went Wrong!");
      }
    }, error => {
      this.toast.error(error?.error?.message);
    })
  }
  /**
   * change event of coment 
   * @param event 
   */
  changeComment(event: any) {
    this.mHomeCreateCommentRequest.content = event;
  }
  /**
   * Api to give a comment on post
   * @param postId 
   */
  sendComment(postId: any) {
    this.mHomeCreateCommentRequest.post_id = postId
    if (this.mHomeCreateCommentRequest.content == "" || this.mHomeCreateCommentRequest.content == undefined) {
      this.toast.error("Please enter comment!");
    } else {
      this.wsHome.createComent(this.mHomeCreateCommentRequest).toPromise().then(createCommentRes => {
        if (createCommentRes && createCommentRes.id) {
          this.comment = '';
          this.getPostsCall();

        } else {
          this.toast.error("Something went Wrong!");
        }
      }, error => {
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * api call to get user post
   */
  getPostsCall() {
    if (this.userposts && this.singlePost) {
      this.wsProfile.getUserPosts("1").toPromise().then(resPosts => {
        if (resPosts && resPosts.data) {
          this.userposts = resPosts.data;
          this.mHomeCreateCommentRequest.content = '';
          this.modalService.dismissAll();
          this.singlePost = '';
          this.likeStatus = '';
        } else {
          this.toast.error("Something went Wrong!");
        }
      }, error => {
        this.toast.error(error?.error?.message);
      })
    } else {
      this.wsHome.getPosts("1").toPromise().then(resPosts => {
        if (resPosts && resPosts.data) {
          if (this.posts && this.singlePost) {
            this.posts = resPosts.data;
          } else if (this.feedposts && this.singlePost) {
            this.feedposts = resPosts.data;
          } else if (this.feedposts) {
            this.feedposts = resPosts.data;
          } else if (this.posts) {
            this.posts = resPosts.data;
          }
          this.mHomeCreateCommentRequest.content = '';
          this.modalService.dismissAll();
          this.singlePost = '';
          this.likeStatus = '';
        } else {
          this.toast.error("Something went Wrong!");
        }
      }, error => {
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * open modal to view single post
   * @param content 
   * @param post 
   */
  open(content: any, post: any) {
    this.singlePost = post;
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
   * dismiss the modal
   * @param reason 
   * @returns 
   */
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      console.log("else", reason)
      return `with: ${reason}`;
    }
  }

  async loadMore() {
    if (this.last_page == -1) {
      await this.wsHome.getPosts(1).toPromise().then(resPosts => {
        this.last_page = resPosts.last_page;
        this.pageNo = Number(resPosts.current_page);
      }, error => {
        this.loaderShow = false;
        console.log("getPosts error", error)
        this.toast.error(error?.error?.message);
      })
    }
    console.log(this.pageNo)
    this.pageNo++;
    console.log(this.pageNo, this.last_page)
    if (this.pageNo > 0 && this.pageNo <= this.last_page) {
      this.wsHome.getPosts(this.pageNo).toPromise().then(resPosts => {
        if (resPosts && resPosts.data) {
          this.loaderShow = false;
          this.last_page = resPosts.last_page;
          this.feedposts = [...this.feedposts, ...resPosts.data];
          this.showButton = true;
          console.log("pageNo,lastepage", this.pageNo, this.last_page)
          if (this.pageNo == this.last_page) {
            this.showNoItem = true;
          }
          if (!this.showNoItem) {
            this.createObserver(false);
          }
          console.log("postsss", this.feedposts)
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

    }
  }

  createObserver(fromLoadMore?: any) {
    const threshold = 0.2; // how much % of the element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]['isIntersecting'] === true) {
          this.showButton = false;
          this.loadMore()
        }
        else {
          console.log('Target is not visible in the screen');
        }
      },
      { threshold }
    );
    console.log("fromLoadMore", fromLoadMore)
    if (fromLoadMore) {
      setTimeout(() => {
        console.log("yourElement", this.yourElement)
        observer.observe(this.yourElement.nativeElement);
      }, 4000);
    } else {
      setTimeout(() => {
        console.log("yourElement", this.yourElement)
        observer.observe(this.yourElement.nativeElement);
      }, 1000);
    }
  }
  onUp() {
    console.log("onUp")
    console.log(this.pageNo)
    this.pageNo++;
    // if (this.pageNo > 0 <= this.last_page) {
    this.wsHome.getPosts(this.pageNo).toPromise().then(resPosts => {
      if (resPosts && resPosts.data) {
        this.loaderShow = false;
        this.last_page = resPosts.last_page;
        this.feedposts = [...this.feedposts, ...resPosts.data];
        console.log("postsss", this.feedposts)
      } else {
        this.loaderShow = false;
        this.toast.error("Something went Wrong!");
      }
    }, error => {
      this.loaderShow = false;
      console.log("getPosts error", error)
      this.toast.error(error?.error?.message);
    })
    // }
  }




}
