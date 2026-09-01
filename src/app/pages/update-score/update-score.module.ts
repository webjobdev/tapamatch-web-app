import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class UpdateScorePageModule { }

/**
 * Modal to update score request 
 */
export class MUpdateScoreRequest {
  won_id!: number
  team_a!: number
  lose_id!: number
  team_a_score!: string
  challenge_id!: string
  team_b_score!: string
  tema_b!: number
  referee_id!: any
  is_tie!: number
  friendly_id!: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to update score response 
 */
export class MUpdateScoreResponse {
  status!: any
  message!: string
  data!: MUpdateScoreResponseData
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Modal to update score response data 
 */
export class MUpdateScoreResponseData {
  id: any
  team_a: any
  tema_b: any
  team_a_score: any
  team_b_score: any
  won_id: any
  lose_id: any
  referee_id: any
  friendly_id: any
  challenge_id: any
  is_tie: any
  leader_board_status: any
  is_reset: any
  reset_date: any
  created_at: any
  updated_at: any
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}



