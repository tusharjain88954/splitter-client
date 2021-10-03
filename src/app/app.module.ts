import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/user.service';
import { HomeComponent } from './home/home.component';
import { GroupListComponent } from './home/group-list/group-list.component';
import { SearchGroupComponent } from './home/search-group/search-group.component';
import { GroupComponent } from './home/group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    HomeComponent,
    GroupListComponent,
    SearchGroupComponent,
    GroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'signup',
        component: UserComponent,
        children: [{ path: '', component: SignUpComponent }],
      },
      {
        path: 'login',
        component: UserComponent,
        children: [{ path: '', component: SignInComponent }],
      },
      {
        path: 'userprofile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ]),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
