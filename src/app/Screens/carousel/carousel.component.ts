import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { appConfig } from 'src/app/config';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  screenList: Array<any> = ['home','portfolio', 'overview', 'designService','developmentService', 'itInfraManagement', 'digitalMarketing'];
  designServiceSection: Array<any> = ['DesignServices','Banner'];
  developmentServiceSection: Array<any> = ['DevelopmentServices','Banner'];
  itInfraServiceSection: Array<any> = ['ItInfraServices','Banner'];
  digitalServiceSection: Array<any> = ['DigitalMarketingServices','Banner'];
  homePageSections: any = ['carousel', 'industries', 'Banner'];
  overViewPageSections: Array<any> = ['OurVision','OurMission', 'Banner'];
  carouselList: any = [];
  showAddCarousel: any = false;
  showEditCarousel: any = false;
  showDeleteModal: any = false;
  addCarouselBody: any={
    title: '',
    description: '',
    screen: '',
    imageUrl: '',
    type: ''
  };
  currentBody: any = {
  }
  currentScreen: any = 'home';
  showLoader: any = false;

  ngOnInit(): void {
    this.getCarouselList();
  }
  getCarouselList() {
    this.showLoader = true;
    console.log(this.currentBody)
    this.apiService.getCarouselDetails(this.currentScreen).subscribe(res => {
      console.log(res);
      this.carouselList = res;
      this.showLoader = false;
    },
    (err: any) => {
      this.showLoader = false;
    }
    )
  }

  addCarouselClick() {
    this.currentBody = {...this.addCarouselBody};
    this.showAddCarousel = true;
  }
changeTab(screen: any) {
  this.currentScreen=screen;
  this.getCarouselList();
}
  addCarousel() {
    this.showLoader = true;
    this.currentBody.screen = this.currentScreen;
    if(this.showEditCarousel ==true) {
      this.apiService.updateCarousel(this.currentBody).subscribe(res => {
        this.getCarouselList();
        this.showEditCarousel = false;
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
      })
    } else {
      this.apiService.addCarousel(this.currentBody).subscribe(res => {
        this.getCarouselList();
        this.showAddCarousel = false;
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
      })
    }
    
  }

  deleteCarousel() {
    this.showLoader = true;
    this.apiService.deleteCarousel(this.currentBody).subscribe((res: any) => {
      this.getCarouselList();
      this.closeModal();
      this.showLoader = false;
    }, err => {
      this.showLoader = false;
    })
  }

  closeModal() {
    this.currentBody = this.addCarouselBody;
    this.showAddCarousel = false;
    this.showEditCarousel = false;
    this.showDeleteModal = false;
  }

  editClicked(carousel: any) {
    this.showEditCarousel = true;
    this.currentBody = {...carousel};
    this.currentBody.carouselId = carousel._id;
  }
  deleteClicked(carousel: any) {
    this.showDeleteModal = true;
    this.currentBody.carouselId = carousel._id;
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
          this.currentBody.imageUrl = res.fileUrl;
          this.showLoader = false;
        },
        (err: any) => {
          this.showLoader = false;
          console.log(err);
        })
    });

    reader.readAsDataURL(file);
  }

  checkTheChange(url: any) {
    console.log(appConfig.frontEndUrl + url);
    window.open(appConfig.frontEndUrl + url )
  }
}
