import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  faqList: Array<any> = ['GettingStarted','PricingPlans', 'SalesQuestions', 'UsageGuides'];

  overViewPageSections: Array<any> = ['OurVision','OurMission', 'Banner'];
  faqs: any = [];
  selectedFaq='';
  showAddFAQ: any = false;
  showEditFAQ: any = false;
  showDeleteModal: any = false;
  addFAQBody: any={
    title: '',
    description: '',
    type: ''
  };
  currentBody: any = {
  }
  currentFAQ: any = 'GettingStarted';

  ngOnInit(): void {
    this.getFAQList();
  }
  getFAQList() {
    console.log(this.currentBody)
    this.apiService.getFAQDetails(this.currentFAQ).subscribe(res => {
      console.log(res);
      this.faqs = res;
    },
    (err: any) => {

    }
    )
  }

  addFAQClick() {
    this.currentBody = {...this.addFAQBody};
    this.showAddFAQ = true;
  }
changeTab(screen: any) {
  this.currentFAQ=screen;
  this.getFAQList();
}
  addFAQ() {
    this.currentBody.type = this.currentFAQ;
    if(this.showEditFAQ ==true) {
      this.apiService.updateFAQ(this.currentBody).subscribe(res => {
        this.getFAQList();
        this.showEditFAQ = false;
      })
    } else {
      this.apiService.addFAQ(this.currentBody).subscribe(res => {
        this.getFAQList();
        this.showAddFAQ = false;
      })
    }
    
  }

  deleteFAQ() {
    this.apiService.deleteFAQ(this.currentBody).subscribe((res: any) => {
      this.getFAQList();
      this.closeModal();
    })
  }

  closeModal() {
    this.currentBody = this.addFAQBody;
    this.showAddFAQ = false;
    this.showEditFAQ = false;
    this.showDeleteModal = false;
  }

  editClicked(faq: any) {
    this.showEditFAQ = true;
    this.currentBody = {...faq};
    this.currentBody.FAQId = faq._id;
  }
  deleteClicked(faq: any) {
    this.showDeleteModal = true;
    this.currentBody.FAQId = faq._id;
  }
}
