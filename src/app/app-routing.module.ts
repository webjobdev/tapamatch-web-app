import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModaldialogComponent } from './modaldialog/modaldialog.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { CreateFriendlyComponent } from './pages/create-friendly/create-friendly.component';
import { CreateTeamComponent } from './pages/create-team/create-team.component';
import { FeedsComponent } from './pages/feeds/feeds/feeds.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FormComponent } from './pages/form/form.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { MembersComponent } from './pages/members/members/members.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UpdateScoreComponent } from './pages/update-score/update-score.component';
import { VenueListComponent } from './pages/venue-list/venue-list.component';
import { WalletComponent } from './pages/wallet/wallet.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'forgotpassword',
  component: ForgotPasswordComponent
},
{
  path: 'sidenav',
  component: SidenavComponent
},
{
  path: 'header',
  component: HeaderComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'profile/:id',
  component: ProfileComponent
},
{
  path: 'feeds',
  component: FeedsComponent
},
{
  path: 'members',
  component: MembersComponent
},
{
  path: 'members/friends',
  component: MembersComponent
},
{
  path: 'modaldialog',
  component: ModaldialogComponent
},
{
  path: 'wallet',
  component: WalletComponent
},
{
  path: 'list',
  component: ListComponent
},
{
  path: 'create-challenge',
  component: FormComponent
},
{
  path: 'create-friendly',
  component: CreateFriendlyComponent
},
{
  path: 'create-match',
  component: CreateEventComponent
},
{
  path: 'create-team',
  component: CreateTeamComponent
},
{
  path: 'update-challenge',
  component: FormComponent
},
{
  path: 'create-challenge-vs-group',
  component: FormComponent
},
{
  path: 'update-friendly',
  component: CreateFriendlyComponent
},
{
  path: 'update-match',
  component: CreateEventComponent
},
{
  path: 'update-team',
  component: CreateTeamComponent
},
{
  path: 'update-score',
  component: UpdateScoreComponent
},
{
  path: 'venue-list',
  component: VenueListComponent
},
{
  path: 'notification',
  component: NotificationComponent
},
{
  path: 'chat',
  component: ChatComponent
},
{
  path: 'chat/:id',
  component: ChatComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
