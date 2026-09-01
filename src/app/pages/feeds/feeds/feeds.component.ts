import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WsHomeService } from 'src/app/ws/wsHome/ws-home.service';
import { MHomePostResponse } from '../../home/home.module';
@HostListener('window:scroll', ['$event'])

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  selector: string = ".page";
  mHomePostResponse: MHomePostResponse = new MHomePostResponse();
  loaderShow: boolean = false;
  pageNo: number = 1;
  posts: any;
  last_page: any;
  show_scroll_top: any;

  constructor(private wsHome: WsHomeService, private toast: ToastrService) {


  }

  ngOnInit(): void {
    // window.addEventListener('scroll', this.scroll, true);
    this.loaderShow = true;
    /**
     * Api call to get posts to show in feeds page
     */
    this.wsHome.getPosts(this.pageNo).toPromise().then(resPosts => {
      if (resPosts && resPosts.data) {
        this.loaderShow = false;
        this.posts = resPosts.data;
        this.last_page = resPosts.last_page;
        this.pageNo = Number(resPosts.current_page) + 1;
        // for (var i = this.pageNo; i <= this.last_page; i++) {
        //   if (i <= this.last_page) {
        //     this.wsHome.getPosts(i).toPromise().then(resPosts => {
        //       if (resPosts && resPosts.data) {
        //         this.loaderShow = false;
        //         this.posts = [...this.posts, ...resPosts.data];
        //         this.posts.sort(this.sortFunction);
        //         i++;
        //       }
        //     }, error => {
        //       this.loaderShow = false;
        //       console.log("getPosts error", error)
        //       this.toast.error(error?.error?.message);
        //     })
        //   } else {
        //     return;
        //   }
        // }
      } else {
        this.loaderShow = false;
        this.toast.error("Something went Wrong!");
      }
    }, error => {
      this.loaderShow = false;
      console.log("getPosts error", error)
      this.toast.error(error?.error?.message);
    })
  }

  ngOnDestroy() {
    // window.removeEventListener('scroll', this.scroll, true);
  }


  sortFunction(a: any, b: any) {
    var dateA = new Date(a.created_at).getTime();
    var dateB = new Date(b.created_at).getTime();
    return dateB > dateA ? 1 : -1;
  };

  onScrollDown() {
    // console.log("e", e)
    console.log("fsafsafsf", this.pageNo)

  }
  // }
  // onUp() {
  //   console.log("onUp")
  //   console.log(this.pageNo)
  //   this.pageNo++;
  //   // if (this.pageNo > 0 <= this.last_page) {
  //   this.wsHome.getPosts(this.pageNo).toPromise().then(resPosts => {
  //     if (resPosts && resPosts.data) {
  //       this.loaderShow = false;
  //       this.last_page = resPosts.last_page;
  //       this.posts = [...this.posts, ...resPosts.data];
  //       console.log("postsss", this.posts)
  //     } else {
  //       this.loaderShow = false;
  //       this.toast.error("Something went Wrong!");
  //     }
  //   }, error => {
  //     this.loaderShow = false;
  //     console.log("getPosts error", error)
  //     this.toast.error(error?.error?.message);
  //   })
  //   // }
  // }

  scroll = (event: any): void => {

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      console.log(event)
      // // if (this.pageNo > 0 <= this.last_page) {
      this.wsHome.getPosts(this.pageNo).toPromise().then(resPosts => {
        if (resPosts && resPosts.data) {
          this.loaderShow = false;
          this.last_page = resPosts.last_page;
          this.posts = [...this.posts, ...resPosts.data];
          console.log("postsss", this.posts)
          this.pageNo = Number(resPosts.current_page) + 1;
        } else {
          this.loaderShow = false;
          this.toast.error("Something went Wrong!");
        }
      }, error => {
        this.loaderShow = false;
        console.log("getPosts error", error)
        this.toast.error(error?.error?.message);
      })
    }

  };


}

