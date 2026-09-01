import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { HeaderComponent } from './pages/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CardPageSmallComponent } from './card-page-small/card-page-small.component';
import { CardCountsComponent } from './card-counts/card-counts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { ModaldialogComponent } from './modaldialog/modaldialog.component';
import { FeedsComponent } from './pages/feeds/feeds/feeds.component';
import { MembersComponent } from './pages/members/members/members.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { ListComponent } from './pages/list/list.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { FormComponent } from './pages/form/form.component';
import { CreateFriendlyComponent } from './pages/create-friendly/create-friendly.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { CreateTeamComponent } from './pages/create-team/create-team.component';
import { UpdateScoreComponent } from './pages/update-score/update-score.component';
import { VenueListComponent } from './pages/venue-list/venue-list.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HomeComponent,
    SidenavComponent,
    HeaderComponent,
    ProfileComponent,
    CardPageComponent,
    CardPageSmallComponent,
    CardCountsComponent,
    ModaldialogComponent,
    FeedsComponent,
    MembersComponent,
    WalletComponent,
    ListComponent,
    FormComponent,
    CreateFriendlyComponent,
    CreateEventComponent,
    CreateTeamComponent,
    UpdateScoreComponent,
    VenueListComponent,
    NotificationComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatCommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    NgbModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
