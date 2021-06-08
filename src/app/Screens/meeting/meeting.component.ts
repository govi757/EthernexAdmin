import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  subscriberList: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSubscriberList();
  }

  getSubscriberList() {
    this.apiService.getMeetingList().subscribe(res => {
      this.subscriberList = res;
    })
  }
}
