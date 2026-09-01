import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './chat.component';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/firestore';

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
export class ChatModule { }
