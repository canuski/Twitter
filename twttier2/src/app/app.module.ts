import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RightNavComponent,
    LeftNavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: 'home', component: HomeComponent },
        { path: ':handle', component: ProfileComponent },
        { path: '', component: HomeComponent },
        { path: '**', component: ProfileComponent },
      ],
      {
        useHash: true,
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
