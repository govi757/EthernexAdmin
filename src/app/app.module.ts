import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ScreenDetailsComponent } from './screen-details/screen-details.component';
import { FormsModule } from '@angular/forms';
import { HomescreenComponent } from './Screens/homescreen/homescreen.component';
import { ServicesComponent } from './Screens/services/services.component';
import { CarouselComponent } from './Screens/carousel/carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BasicinfoComponent } from './Screens/basicinfo/basicinfo.component';
import { TeamComponent } from './Screens/team/team.component';
import { FaqsComponent } from './Screens/faqs/faqs.component';
import { SubscriberComponent } from './Screens/subscriber/subscriber.component';
import { MeetingComponent } from './Screens/meeting/meeting.component';
import { NgxEditorModule } from 'ngx-editor';
import { RichtextComponent } from './components/richtext/richtext.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ScreenDetailsComponent,
    HomescreenComponent,
    ServicesComponent,
    CarouselComponent,
    HeaderComponent,
    SidenavComponent,
    BasicinfoComponent,
    TeamComponent,
    FaqsComponent,
    SubscriberComponent,
    MeetingComponent,
    RichtextComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
