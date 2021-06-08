import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ScreenDetailsComponent } from './screen-details/screen-details.component';
import { BasicinfoComponent } from './Screens/basicinfo/basicinfo.component';
import { CarouselComponent } from './Screens/carousel/carousel.component';
import { FaqsComponent } from './Screens/faqs/faqs.component';
import { HomescreenComponent } from './Screens/homescreen/homescreen.component';
import { MeetingComponent } from './Screens/meeting/meeting.component';
import { ServicesComponent } from './Screens/services/services.component';
import { SubscriberComponent } from './Screens/subscriber/subscriber.component';
import { TeamComponent } from './Screens/team/team.component';

const routes: Routes = [
  { path: 'admin/dashboard', component: DashboardComponent ,
  children:[
    { path: 'services', component: ServicesComponent },
    { path: 'carousel', component: CarouselComponent },  
    { path: 'basic', component: BasicinfoComponent },  
    { path: 'team', component: TeamComponent },  
    { path: 'faq', component: FaqsComponent },  
    { path: 'subscriber', component: SubscriberComponent },  
    { path: 'meeting', component: MeetingComponent },  
  ]

},
  { path: 'admin/screenDetails/:screenId', component: ScreenDetailsComponent },
  { path: 'admin/home-screen', component: HomescreenComponent },
  { path: 'admin/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
