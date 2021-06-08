import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { appConfig } from 'src/app/config';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.css']
})
export class BasicinfoComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  showLoader: any = false;
  basicInfoList: any = [];
  showAddBasicInfo: any = false;
  showEditBasicInfo: any = false;
  showDeleteModal: any = false;
  screenList: Array<any> = ['home', 'overview', 'faq', 'portfolio','designService','developmentService', 'itInfraStructureService','digitalMarketingService'];
  addBasicInfoBody: any={
    title: '',
    description: '',
    screen: '',
    imageUrl: '',
    description1: '',
    description2: '',
    description3: '',
  };
  currentBody: any = {

  }

  ngOnInit(): void {
    this.getBasicInfoList();
  }
  getBasicInfoList() {
    this.showLoader = true;
    this.screenList = ['home', 'overview', 'faq', 'portfolio','designService','developmentService', 'itInfraStructureService','digitalMarketingService'];
    this.apiService.getBasicInfoDetails().subscribe(res => {
      this.showLoader = false;
      console.log(res);
      this.basicInfoList = res;
      this.basicInfoList.map((itm: any) => {
        const arr = this.screenList.filter(item => {
          return item !== itm.screen
        });
        this.screenList = arr;
      })
    },
    (err: any) => {
      this.showLoader = false;
    }
    )
  }

  addBasicInfoClick() {
    this.currentBody = {...this.addBasicInfoBody};
    this.showAddBasicInfo = true;
  }

  addBasicInfo() {
    this.showLoader = true;
    if(this.showEditBasicInfo ==true) {
      this.apiService.updateBasicInfo(this.currentBody).subscribe(res => {
        this.getBasicInfoList();
        this.showEditBasicInfo = false;
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
      })
    } else {
      this.apiService.addBasicInfo(this.currentBody).subscribe(res => {
        this.getBasicInfoList();
        this.showAddBasicInfo = false;
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
      })
    }
    
  }

  deleteBasicInfo() {
    this.showLoader = true;
    this.apiService.deleteBasicInfo(this.currentBody).subscribe((res: any) => {
      this.getBasicInfoList();
      this.closeModal();
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    })
  }

  closeModal() {
    this.currentBody = this.addBasicInfoBody;
    this.showAddBasicInfo = false;
    this.showEditBasicInfo = false;
    this.showDeleteModal = false;
  }

  editClicked(basicInfo: any) {
    this.showEditBasicInfo = true;
    this.currentBody = {...basicInfo};
    this.currentBody.basicInformationsId = basicInfo._id;
  }
  deleteClicked(basicInfo: any) {
    this.showDeleteModal = true;
    this.currentBody.basicInformationsId = basicInfo._id;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      const selectedFile = new ImageSnippet(event.target.result, file);
      this.showLoader = true;
      this.apiService.uploadImage(selectedFile.file).subscribe(
        (res: any) => {
          console.log(res);
          this.showLoader = false;
          this.currentBody.imageUrl = res.fileUrl;
        },
        (err: any) => {
          console.log(err);
          this.showLoader = false;
        })
    });

    reader.readAsDataURL(file);
  }

  checkTheChange(url: any) {
    console.log(appConfig.frontEndUrl + url);
    window.open(appConfig.frontEndUrl + url )
  }
}
