import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateScoreService } from 'src/app/ws/wsUpdateScore/update-score.service';
import { MHomeUpcomingChallengeResponse, MHomeUpcomingFriendlyResponse } from '../home/home.module';
import { MUpdateScoreRequest } from './update-score.module';

@Component({
  selector: 'app-update-score',
  templateUrl: './update-score.component.html',
  styleUrls: ['./update-score.component.scss']
})
export class UpdateScoreComponent implements OnInit {
  updateScoreFormgroup: FormGroup;
  type: any;
  mHomeUpcomingChallengeResponse: MHomeUpcomingChallengeResponse = new MHomeUpcomingChallengeResponse();
  mHomeUpcomingFriendlyResponse: MHomeUpcomingFriendlyResponse = new MHomeUpcomingFriendlyResponse();
  loaderShow: boolean = false;
  mUpdateScoreRequest: MUpdateScoreRequest = new MUpdateScoreRequest();
  userAScore: any = 0;
  userBScore: any = 0;
  constructor(private formBuilder: FormBuilder, private wsUpdateScore: UpdateScoreService, private toast: ToastrService) {
    this.updateScoreFormgroup = this.formBuilder.group({
      type: [''],
      friendly: [''],
      challenge: [''],
      userA: [''],
      userB: [''],
      userAScore: [''],
      userBScore: [''],
      won: ['']
    });
    this.updateScoreFormgroup.controls['type'].setValue('Challenge')
    this.updateScoreFormgroup.controls['userA'].setValue('')
    this.updateScoreFormgroup.controls['userB'].setValue('')
    this.updateScoreFormgroup.controls['userAScore'].setValue(0)
    this.updateScoreFormgroup.controls['userBScore'].setValue(0)
    this.type = "Challenge";
    this.wsUpdateScore.getChallengeUserWise().toPromise().then(resChallenge => {
      this.mHomeUpcomingChallengeResponse.data = []
      if (resChallenge && resChallenge.status) {
        this.mHomeUpcomingChallengeResponse.data = resChallenge.data;
        this.loaderShow = false;
      } else {
        this.loaderShow = false;
        this.toast.error(resChallenge.message);
      }
    }, error => {
      this.loaderShow = false;
      console.log("getChallengeUserWise error", error)
      this.toast.error(error?.error?.message);
    })
  }

  ngOnInit(): void {
  }
  /**
   * selectType used to select type of user
   */
  selectType() {
    this.type = this.updateScoreFormgroup.controls.type.value;
    console.log(this.type)
    /**
     * Get list of cities
     */
    this.loaderShow = true;
    if (this.type == "Challenge") {
      this.wsUpdateScore.getChallengeUserWise().toPromise().then(resChallenge => {
        this.mHomeUpcomingChallengeResponse.data = []
        if (resChallenge && resChallenge.status) {
          this.mHomeUpcomingChallengeResponse.data = resChallenge.data;
          this.loaderShow = false;
        } else {
          this.loaderShow = false;
          this.toast.error(resChallenge.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("getChallengeUserWise error", error)
        this.toast.error(error?.error?.message);
      })
    } else {
      this.wsUpdateScore.getFriendlyUserWise().toPromise().then(resFriendly => {
        this.mHomeUpcomingFriendlyResponse.data = []
        if (resFriendly && resFriendly.status) {
          this.loaderShow = false;
          this.mHomeUpcomingFriendlyResponse.data = resFriendly.data;
        } else {
          this.loaderShow = false;
          this.toast.error(resFriendly.message);
        }
      }, error => {
        this.loaderShow = false;
        console.log("getFriendlyUserWise error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }
  /**
   * selectMatch used to select match
   * @param matchType 
   */
  selectMatch(matchType: any) {
    if (matchType == "Challenge") {
      console.log(this.updateScoreFormgroup.controls['challenge'].value)
      this.mUpdateScoreRequest.challenge_id = this.updateScoreFormgroup.controls['challenge'].value;
      var challengeSelected = this.mHomeUpcomingChallengeResponse.data.filter((challenge => {
        return challenge.id == this.updateScoreFormgroup.controls['challenge'].value;
      }))
      console.log(challengeSelected)
      if (challengeSelected[0].team_a != null) {
        this.updateScoreFormgroup.controls['userA'].setValue(challengeSelected[0].team_a.grp_name)
        this.mUpdateScoreRequest.team_a = challengeSelected[0].team_a.id;
      }
      if (challengeSelected[0].team_b != null) {
        this.updateScoreFormgroup.controls['userB'].setValue(challengeSelected[0].team_b.grp_name)
        this.mUpdateScoreRequest.tema_b = challengeSelected[0].team_b.id;
      }
    } else {
      console.log(this.updateScoreFormgroup.controls['friendly'].value)
      this.mUpdateScoreRequest.friendly_id = this.updateScoreFormgroup.controls['friendly'].value;
      var friendlySelected = this.mHomeUpcomingFriendlyResponse.data.filter((friendly => {
        return friendly.id == this.updateScoreFormgroup.controls['friendly'].value;
      }))
      console.log(friendlySelected)
      if (friendlySelected[0].user_a != null) {
        this.updateScoreFormgroup.controls['userA'].setValue(friendlySelected[0].user_a.fname + " " + friendlySelected[0].user_a.lname)
        this.mUpdateScoreRequest.team_a = friendlySelected[0].user_a.id;
      }
      if (friendlySelected[0].user_b != null) {
        this.updateScoreFormgroup.controls['userB'].setValue(friendlySelected[0].user_b.fname + " " + friendlySelected[0].user_b.lname)
        this.mUpdateScoreRequest.tema_b = friendlySelected[0].user_b.id;
      }
    }
  }
  /**
   * changeScore used to change the score
   * @param event 
   * @param user 
   */
  changeScore(event: any, user: any) {
    console.log(event.target.value)
    if (user == "1") {
      this.mUpdateScoreRequest.team_a_score = event.target.value;
    } else {
      this.mUpdateScoreRequest.team_b_score = event.target.value;
    }
    if (this.mUpdateScoreRequest.team_a_score == this.mUpdateScoreRequest.team_b_score) {
      this.mUpdateScoreRequest.is_tie = 1;
      this.mUpdateScoreRequest.won_id = this.mUpdateScoreRequest.team_a;
      this.mUpdateScoreRequest.lose_id = this.mUpdateScoreRequest.tema_b;
      this.updateScoreFormgroup.controls['won'].setValue('')
    } else if (this.mUpdateScoreRequest.team_a_score > this.mUpdateScoreRequest.team_b_score) {
      this.mUpdateScoreRequest.won_id = this.mUpdateScoreRequest.team_a;
      this.mUpdateScoreRequest.lose_id = this.mUpdateScoreRequest.tema_b;
      this.mUpdateScoreRequest.is_tie = 0;
      this.updateScoreFormgroup.controls['won'].setValue(this.updateScoreFormgroup.controls['userA'].value)
    } else if (this.mUpdateScoreRequest.team_a_score < this.mUpdateScoreRequest.team_b_score) {
      this.mUpdateScoreRequest.won_id = this.mUpdateScoreRequest.tema_b;
      this.mUpdateScoreRequest.lose_id = this.mUpdateScoreRequest.team_a;
      this.mUpdateScoreRequest.is_tie = 0;
      this.updateScoreFormgroup.controls['won'].setValue(this.updateScoreFormgroup.controls['userB'].value)
    }
  }
  /**
   * scoreUpdate used to update score
   */
  scoreUpdate() {
    console.log(this.mUpdateScoreRequest)
    if (this.mUpdateScoreRequest.challenge_id == '' || this.mUpdateScoreRequest.friendly_id == '') {
      this.toast.error("Please select match!")
    } else if (this.mUpdateScoreRequest.team_a == null || this.mUpdateScoreRequest.team_a == undefined || this.mUpdateScoreRequest.team_a == null || this.mUpdateScoreRequest.team_a == undefined) {
      this.toast.error("Please select Team!")
    } else {
      this.loaderShow = true;
      var user = "" + window.localStorage.getItem('id');
      this.mUpdateScoreRequest.referee_id = user;
      console.log(this.mUpdateScoreRequest)
      this.wsUpdateScore.updateScore(this.mUpdateScoreRequest).toPromise().then(resUpdateScore => {

        if (resUpdateScore.status || resUpdateScore.status == 200) {
          this.updateScoreFormgroup.controls['type'].setValue('Challenge')
          this.updateScoreFormgroup.controls['userA'].setValue('')
          this.updateScoreFormgroup.controls['userB'].setValue('')
          this.updateScoreFormgroup.controls['userAScore'].setValue(0)
          this.updateScoreFormgroup.controls['userBScore'].setValue(0)
          this.type = "Challenge";
          this.loaderShow = false;
          this.toast.success(resUpdateScore.message);
        } else {
          this.loaderShow = false;
          this.toast.error(resUpdateScore.message);
        }

      }, error => {
        this.loaderShow = false;
        console.log("createNewTeam error", error)
        this.toast.error(error?.error?.message);
      })
    }
  }

}
