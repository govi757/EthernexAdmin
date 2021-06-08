import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  mainServiceTypeList: any = ['Basic','Development', 'Design', 'ItInfraManagement','DigitalMarketing', 'Others'];
  basicServiceList: any = ['development-service', 'design-service', 'it-infra-service', 'digital-marketing', 'Others'];
  designServiceList: any = ['brandingLogo', 'graphicDesign', 'UiUxDesign', 'VideoProduction'];
  developmentServiceList: any = ['Web', 'Mobile', 'Custom', 'ECommerce'];
  itInfraServiceList: any = ['securitySurvilance', 'unifiedCommunication', 'networkSolutions'];
  digitalMarketingServices: any = ['searchEngineOptimization','socialMediaMarketing', 'googleMarketing', 'emailMarketing','contentMarketing','conversionRateOptimization', 'payPerClick'];
  currentMainService: any = 'Basic';
  serviceList: any = [];
  showAddService: any = false;
  showEditService: any = false;
  showDeleteModal: any = false;
  addServiceBody: any={
    title: '',
    description: '',
    type: 'Basic',
    imageUrl: '',
    subType: 'Others'
  };
  currentBody: any = {

  }
  showLoader: any = false;

  ngOnInit(): void {
    this.getServiceList();
  }
  getServiceList() {
    this.showLoader = true;
    this.basicServiceList = ['development-service', 'design-service', 'it-infra-service', 'digital-marketing', 'Others'];
    this.designServiceList = ['brandingLogo', 'graphicDesign', 'UiUxDesign', 'VideoProduction'];
    this.developmentServiceList = ['Web', 'Mobile', 'Custom', 'ECommerce'];
    this.itInfraServiceList = ['securitySurvilance', 'unifiedCommunication', 'networkSolutions'];
    this.digitalMarketingServices = ['searchEngineOptimization','socialMediaMarketing', 'googleMarketing', 'emailMarketing','contentMarketing','conversionRateOptimization', 'payPerClick'];
    this.apiService.getServiceDetails(this.currentMainService).subscribe((res: any) => {
      this.showLoader = false;
      console.log(res);
      res.map((item: any) => {
        let arr = [];
        if(this.currentMainService=='Basic') {
        arr = this.basicServiceList.filter((service: any) => {
          return service !== item.subType  
        });
        this.basicServiceList = arr;
      }
        
      })
      
      this.serviceList = res;
    },
    err => {
      this.showLoader = false;
    }
    )
  }

  addServiceClick() {
    this.currentBody = {...this.addServiceBody};
    this.showAddService = true;
  }

  addService() {
    this.showLoader = true;
    this.currentBody.type = this.currentMainService;
    if(this.showEditService ==true) {
      this.apiService.updateService(this.currentBody).subscribe(res => {
        this.getServiceList();
        this.showEditService = false;
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
      })
    } else {
      this.apiService.addService(this.currentBody).subscribe(res => {
        this.getServiceList();
        this.showAddService = false;
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
      })
    }
    
  }

  deleteService() {
    this.showLoader = true;
    this.apiService.deleteService(this.currentBody).subscribe(res => {
      this.getServiceList();
      this.closeModal();
      this.showLoader = false;
    },
    err => {
      this.showLoader = false;
    })
  }

  closeModal() {
    this.currentBody = this.addServiceBody;
    this.showAddService = false;
    this.showEditService = false;
    this.showDeleteModal = false;
  }

  editClicked(service: any) {
    this.showEditService = true;
    this.currentBody = {...service};
    this.currentBody.serviceId = service._id;
  }
  deleteClicked(service: any) {
    this.showDeleteModal = true;
    this.currentBody.serviceId = service._id;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.showLoader = true;
    reader.addEventListener('load', (event: any) => {

      const selectedFile = new ImageSnippet(event.target.result, file);

      this.apiService.uploadImage(selectedFile.file).subscribe(
        (res: any) => {
          console.log(res);
          this.currentBody.imageUrl = res.fileUrl;
          this.showLoader = false;
        },
        (err) => {
          this.showLoader = false;
          console.log(err);
        })
    });

    reader.readAsDataURL(file);
  }
  changeTab(service: any) {
  this.currentMainService=service;
  this.getServiceList();
  }
}
