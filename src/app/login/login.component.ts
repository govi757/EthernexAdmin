import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLogin=true;

  signupBody={
    name: '',
    email:'',
    phoneNumber: '',
    title: 'Signup attempt'
  }

  loginBody={
    email:'',
    password: ''
  }
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  signup() {
    if(this.signupBody.email.trim() !== '' && this.signupBody.phoneNumber !=='') {
    this.apiService.signup(this.signupBody).subscribe(res => {
      console.log(res);
      this.signupBody = {
        name: '',
        email:'',
        phoneNumber: '',
        title: 'Signup attempt'
      }
      this.showLogin = true;
      alert("Admin will contact you with the password")
    },
    err => {
      console.log(JSON.stringify(err));
    })
  }
  }

  login() {
    //1wnd88
    this.apiService.login(this.loginBody).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token)
      this.router.navigate(['admin/dashboard/basic']);
    },
    err => {

    })
    
  }
}
