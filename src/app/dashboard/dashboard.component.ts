import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public screensList: any = [];
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getScreens().subscribe(res => {
      console.log(res);
      this.screensList = res;
    });
  }

  openScreenDetails(screen: any) {
    this.router.navigate(['screenDetails/'+screen._id]);
  }
  openHomeScreenDetails() {
    this.router.navigate(['home-screen']);
  }

}
