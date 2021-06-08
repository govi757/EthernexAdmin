import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Editor } from 'ngx-editor';



@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {
  
  subscriberList: any = [];
  showEmailEditor: any = false;
  emailsList = '';
  constructor(private apiService: ApiService) { }
  editor: any;
  html:any =  '';
  ngOnInit(): void {
    this.getSubscriberList();
  }

  getSubscriberList() {
    this.apiService.getSubscriberList().subscribe(res => {
      this.subscriberList = res;
      this.subscriberList.map((item: any) => {
        this.emailsList = this.emailsList + item.email + ','
      })
    })
  }

  sendEmailPressed() {
    const emailUrl = `https://mail.google.com/mail/u/0/?fs=1&to=${this.emailsList}&su=SUBJECT&body=BODY&tf=cm`
    window.open(emailUrl)
    
  }
}
