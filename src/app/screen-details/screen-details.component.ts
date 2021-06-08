import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-screen-details',
  templateUrl: './screen-details.component.html',
  styleUrls: ['./screen-details.component.css']
})
export class ScreenDetailsComponent implements OnInit {
  screenId: any = '';
  screenDetails: any = {};
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.screenId = this.route.snapshot.paramMap.get('screenId')
    this.apiService.getScreenDetails(this.screenId).subscribe((res: any) => {
      this.screenDetails = res;
      console.log(JSON.parse(res.dynamicData))
    })
  }

}
