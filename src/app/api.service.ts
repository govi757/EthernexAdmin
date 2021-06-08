import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private REST_API_SERVER = "http://ethernex.herokuapp.com";
  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*'),
    withCredentials: true
   };
  public getScreens(){
    return this.httpClient.get(this.REST_API_SERVER+'/api/screens-list');
  }

  public getScreenDetails(id: any){
    return this.httpClient.get(this.REST_API_SERVER+'/api/screens-details/'+id);
  }

  public getServiceDetails(service: any){
    return this.httpClient.get(this.REST_API_SERVER+'/api/services-list/'+service);
  }
  public addService(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/add-service',body, this.httpOptions);
  }
  public updateService(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/update-service',body, this.httpOptions);
  }
  public deleteService(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/delete-service',body, this.httpOptions);
  }

  public addCarousel(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/add-carousel',body, this.httpOptions);
  }
  public updateCarousel(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/update-carousel',body, this.httpOptions);
  }
  public deleteCarousel(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/delete-carousel',body, this.httpOptions);
  }
  public getCarouselDetails(type: any){
    return this.httpClient.get(this.REST_API_SERVER+'/api/carousel-list/'+type);
  }

  public addBasicInfo(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/add-basicinfo',body, this.httpOptions);
  }
  public updateBasicInfo(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/update-basicinfo',body, this.httpOptions);
  }
  public deleteBasicInfo(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/delete-basicinfo',body, this.httpOptions);
  }
  public getBasicInfoDetails(screen: any=''){
    return this.httpClient.get(this.REST_API_SERVER+'/api/basicinfo-list', this.httpOptions);
  }
  public getTeamMemberDetails(){
    return this.httpClient.get(this.REST_API_SERVER+'/api/get-team-member-list', this.httpOptions);
  }
  public addTeamMember(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/add-team-member',body);
  }

  public updateTeamMember(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/update-team-member',body, this.httpOptions);
  }
  public deleteTeamMember(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/delete-team-member',body, this.httpOptions);
  }

//FAQ
  public getFAQDetails(faq: any){
    return this.httpClient.get(this.REST_API_SERVER+'/api/get-faq-list/'+faq);
  }
  public addFAQ(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/add-faq',body, this.httpOptions);
  }

  public updateFAQ(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/update-faq',body, this.httpOptions);
  }
  public deleteFAQ(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/delete-faq',body, this.httpOptions);
  }


  public getSubscriberList(){
    return this.httpClient.get(this.REST_API_SERVER+'/api/get-subscriber-list');
  }

  public getMeetingList(){
    return this.httpClient.get(this.REST_API_SERVER+'/api/get-meeting-list');
  }
  public uploadImage(image: any) {
    const formData = new FormData();
    formData.append('file', image);
    return this.httpClient.post(this.REST_API_SERVER+'/api/upload',formData,);
  }
  public signup(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/signup',body);
  }
  public login(body: any){
    return this.httpClient.post(this.REST_API_SERVER+'/api/login',body);
  }

  public logout(){
    return this.httpClient.post(this.REST_API_SERVER+'/api/logout', {});
  }
}
