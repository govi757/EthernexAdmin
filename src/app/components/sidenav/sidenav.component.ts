import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  activeItem: any = "services";
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this.router.url)
    this.getActiveRoute();
  }

  getActiveRoute() {
    const currentRoute = this.router.url.split('/')[2];
    console.log(currentRoute)
    this.activeItem = currentRoute;
  }

  sidenavPressed(item: any) {
    this.router.navigate(['admin/dashboard/'+item]);
    this.activeItem = item;
  }
  logout() {
    this.apiService.logout().subscribe(res => {
      localStorage.clear();
      this.router.navigate(['admin/login/']);
    })
  }
}
