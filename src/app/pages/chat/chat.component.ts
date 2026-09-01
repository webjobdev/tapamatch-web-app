import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import firebase from 'firebase';
import _ from 'lodash';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('target') el: ElementRef | undefined;
  userList: any = []
  user: any;
  users: any = [];
  userDetails: any = [];

  messages: any = [];
  otherUserName: any;
  profileData: any;
  profile: any;
  otherUserDetail: any;
  selectedUser: boolean = false;
  state: any
  userData: any;
  count: number = 0;
  messageSend: any;
  lat: any;
  lng: any;
  messageType: any;
  imageError: any;
  imgView: any;
  updatedMessage: any;
  sendMessageFormGroup: FormGroup;
  loaderShowMessages: boolean = false;
  loaderShow: boolean = false;
  searchUsers: any = [];
  searchToggle: boolean = false;
  constructor(private toast: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private storage: AngularFireStorage, private formBuilder: FormBuilder) {
    this.sendMessageFormGroup = this.formBuilder.group({
      message: ['']
    });
    this.sendMessageFormGroup.controls['message'].setValue('')
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        console.log(evt)
        if (evt.url == '/chat') {
          window.localStorage.setItem("fromState", 'false');
        } else {
          this.activatedRoute.queryParams.subscribe(async (data) => {
            if (this.router.getCurrentNavigation()?.extras?.state) {
              this.state = this.router.getCurrentNavigation()?.extras.state;
              console.log("state", this.state)
              this.retrieveUsers(this.state.state);
            }
          });
        }
      }
    });
  }


  ngOnInit(): void {
    this.profileData = window.localStorage.getItem('profiledata');
    this.profile = JSON.parse(this.profileData);
    if (window.localStorage.getItem("fromState") == 'false') {
      this.retrieveUsers();
      window.localStorage.setItem("fromState", 'true');
    }
  }
  /**
   * retrieveUsers used to get all users data
   * @param stateData 
   */
  retrieveUsers(stateData?: any): void {
    this.loaderShow = true;
    const dbb = firebase.firestore();
    const userId = window.localStorage.getItem('id')
    dbb.collection('users').doc("" + userId).collection('chat_ids').get().then((docSnapShot: any) => {
      console.log((docSnapShot.docs));
      this.users = docSnapShot.docs;
      this.userDetails = []
      if (this.users.length > 0) {
        this.users.forEach((doc: any) => {
          dbb.collection('users').doc('' + doc.data().other_user_id).collection('user_detail').get().then((userSnapShot: any) => {
            console.log("userSnapShot", userSnapShot.docs[0].data())

            const userData = {
              id: userSnapShot.docs[0].data().id,
              image_profile: userSnapShot.docs[0].data().img_profile || userSnapShot.docs[0].data().image_profile,
              username: userSnapShot.docs[0].data().username,
              chat_id: doc.data().chat_id,
              other_user_id: doc.data().other_user_id
            }
            this.userDetails.push(userData)
          })
          console.log("userDetail", this.userDetails)
          if (stateData) {
            console.log("userSnapShot")
            this.count = 1
            this.userDetails.push(stateData)
            this.openChat(stateData)
          }
        });
      } else {
        if (stateData) {
          dbb.collection('users').doc('' + stateData.id).collection('user_detail').get().then((userSnapShot: any) => {
            console.log("userSnapShot111111", userSnapShot.docs)
            if (userSnapShot.docs.length == 0 && this.count == 0) {
              this.count = 1
              this.userDetails.push(stateData)
            }
            this.openChat(stateData)
          });
        }
      }
      this.loaderShow = false;
    },
      (err) => {
        console.log(err);
        this.loaderShow = false;
      });
  }
  /**
   * openChat used to open specific user chat 
   * @param users 
   */
  openChat(users: any) {
    this.selectedUser = true;
    this.loaderShow = true;
    this.otherUserDetail = users;
    const dbb = firebase.firestore();
    if (users.chat_id) {
      dbb.collection('chat_rooms').doc('' + users.chat_id).collection('messages').orderBy('time').onSnapshot(userSnapShot => {
        this.updatedMessage = []
        userSnapShot.docs.forEach((doc: any) => {
          this.updatedMessage.push(doc.data())
        });
        this.messages = this.updatedMessage;
        console.log("messages", this.messages)
        setTimeout(() => {
          this.el?.nativeElement.scroll({ top: this.el.nativeElement.scrollHeight, behavior: "smooth" })
          this.loaderShow = false;
        }, 1000);
      })
    } else {
      this.messages = [];
      this.loaderShow = false;
    }
  }

  /**
   * sendMessage used to send message
   * @param type 
   * @param el 
   * @returns 
   */
  sendMessage(type: any, el: HTMLElement) {
    if (type == 'text' && this.sendMessageFormGroup.controls['message'].value == '') {
      this.toast.error("Please enter message")
      return;
    }
    this.sendMessageFormGroup.controls['message'].setValue('')
    var chatId = this.guid().toUpperCase();
    const dbb = firebase.firestore();
    console.log("user1", this.profile)
    dbb.collection('users').doc('' + this.profile.id).collection('user_detail').doc('profile').set({
      id: "" + this.profile.id,
      image_profile: this.profile.profile_image,
      username: this.profile.uname
    })
    console.log("user2", this.otherUserDetail)
    dbb.collection('users').doc('' + this.otherUserDetail.id).collection('user_detail').doc('profile').set({
      id: "" + this.otherUserDetail.id,
      image_profile: this.otherUserDetail.image_profile,
      username: this.otherUserDetail.username
    })
    this.userData = {}
    dbb.collection('users').doc("" + this.profile.id).collection('chat_ids').get().then(async (docSnapShot: any) => {
      console.log((docSnapShot.docs));
      const userList = docSnapShot.docs;
      var chatSelected = userList.filter(((doc: any) => {
        return doc.data().other_user_id == this.otherUserDetail.id;
      }))
      console.log("chatSelected::::::", chatSelected)
      var date = new Date()
      console.log("date", date)
      var timestamp = parseInt(moment(date).format('x')) / 1000;
      console.log(timestamp);
      if (type == 'location') {
        this.messageType = 'MESSAGE_TYPE_LOCATION'
      } else if (type == 'text') {
        this.messageType = 'MESSAGE_TYPE_TEXT'
      } else {
        this.messageType = 'MESSAGE_TYPE_IMAGE'
      }
      if (chatSelected.length == 0) {
        const usersData = {
          other_user_id: "" + this.otherUserDetail.id,
          chat_id: chatId,
          id: "" + this.otherUserDetail.id,
          image_profile: this.otherUserDetail.image_profile,
          username: this.otherUserDetail.username
        }
        dbb.collection('users').doc('' + this.profile.id).collection('chat_ids').doc().set({
          other_user_id: "" + this.otherUserDetail.id,
          chat_id: chatId
        })
        dbb.collection('users').doc('' + this.otherUserDetail.id).collection('chat_ids').doc().set({
          other_user_id: "" + this.profile.id,
          chat_id: chatId
        })
        const messageToSend = {
          id: "" + this.profile.id,
          member: this.profile.id + "," + this.otherUserDetail.id,
          message: this.messageSend,
          time: "" + timestamp,
          type: this.messageType,
          username: this.profile.uname
        }
        dbb.collection('chat_rooms').doc('' + chatId).collection('messages').doc().set(messageToSend).then(() => {
          el.scroll({ top: el.scrollHeight, behavior: "smooth" })
          this.sendMessageFormGroup.controls['message'].setValue('')
          this.retrieveUsers();
          this.openChat(usersData)
        })
      } else {
        dbb.collection('users').doc("" + this.profile.id).collection('chat_ids').doc("" + chatSelected[0].id).get().then(async (docChat: any) => {
          this.userData = docChat.data();
          console.log("userData", this.userData)
          chatId = this.userData.chat_id
          console.log("chatId:::::::", chatId)
          const messageToSend = {
            id: "" + this.profile.id,
            member: this.profile.id + "," + this.otherUserDetail.id,
            message: this.messageSend,
            time: "" + timestamp,
            type: this.messageType,
            username: this.profile.uname
          }
          dbb.collection('chat_rooms').doc('' + chatId).collection('messages').doc().set(messageToSend).then(() => {
            el.scroll({ top: el.scrollHeight, behavior: "smooth" })
          })
        });
      }
    });
  }
  /**
   * guid used to create new chatId
   * @returns 
   */
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  /**
   * writeMessage used to write text message on change
   * @param event 
   */
  writeMessage(event: any) {
    console.log("event", event.target.value)
    this.messageSend = event.target.value;
  }
  /**
   * shareLocation used to share current location
   * @param el 
   */
  shareLocation(el: HTMLElement) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.messageSend = this.lat + "," + this.lng;
          console.log(position)
          this.sendMessage('location', el);
        }
      })
    }
  }
  /**
   * preview used to send image chat
   * @param fileInput 
   * @param el 
   * @returns 
   */
  preview(fileInput: any, el: HTMLElement) {
    this.imageError = '';
    console.log(fileInput.target.files)
    if (fileInput.target.files && fileInput.target.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg'];
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.imgView = fileInput.target.files[0];
          const imageType = this.imgView.name.split('.')[1];
          var filePath = 'images/' + new Date().getTime() + "." + imageType;
          const ref = this.storage.ref(filePath);
          this.storage.upload(filePath, this.imgView).snapshotChanges().subscribe(url => {
            ref.getDownloadURL().subscribe(url => {
              console.log("url", url)
              this.messageSend = url;
              this.sendMessage('image', el)
            });
          })

          console.log("base64", this.imgView)
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  /**
   * searchUser used to search user by username
   * @param val 
   */
  searchUser(val: any) {
    this.searchToggle = true;
    this.searchUsers = this.search(this.userDetails, val);
  }
  /**
   * search search by name
   * @param source 
   * @param name 
   * @returns 
   */
  search(source: any, name: any) {
    var results = [];
    var index;
    var entry;

    name = name.toUpperCase();
    for (index = 0; index < source.length; ++index) {
      entry = source[index];
      if ((entry && entry.username && entry.username.toUpperCase().indexOf(name) !== -1)) {
        results.push(entry);
      }

    }
    return results;
  }
  /**
   * goToLocation use to redirect to google maps
   */
  goToLocation(message: any) {
    window.open('http://www.google.com/maps/place/' + message)
  }


}
