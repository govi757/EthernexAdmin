import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WezenAdmin';
  constructor(private router: Router) {

  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
      this.router.navigate(['/admin/dashboard/basic'])
    } else {
      this.router.navigate(['/admin/login'])
    }
  }
}
