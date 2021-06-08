import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  teamMemberList: any = [];
  showAddTeamMember: any = false;
  showEditTeamMember: any = false;
  showDeleteModal: any = false;
  addTeamMemberBody: any={
    name: '',
    email: '',
    role: '',
    imageUrl: '',
    phoneNumber: ''
  };
  currentBody: any = {

  }

  ngOnInit(): void {
    this.getTeamMemberList();
  }
  getTeamMemberList() {
    this.apiService.getTeamMemberDetails().subscribe(res => {
      console.log(res);
      this.teamMemberList = res;
    },
    err => {

    }
    )
  }

  addTeamMemberClick() {
    this.currentBody = {...this.addTeamMemberBody};
    this.showAddTeamMember = true;
  }

  addTeamMember() {
    if(this.showEditTeamMember ==true) {
      this.apiService.updateTeamMember(this.currentBody).subscribe(res => {
        this.getTeamMemberList();
        this.showEditTeamMember = false;
      })
    } else {
      this.apiService.addTeamMember(this.currentBody).subscribe(res => {
        this.getTeamMemberList();
        this.showAddTeamMember = false;
      })
    }
    
  }

  deleteTeamMember() {
    this.apiService.deleteTeamMember(this.currentBody).subscribe(res => {
      this.getTeamMemberList();
      this.closeModal();
    })
  }

  closeModal() {
    this.currentBody = this.addTeamMemberBody;
    this.showAddTeamMember = false;
    this.showEditTeamMember = false;
    this.showDeleteModal = false;
  }

  editClicked(service: any) {
    this.showEditTeamMember = true;
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

    reader.addEventListener('load', (event: any) => {

      const selectedFile = new ImageSnippet(event.target.result, file);

      this.apiService.uploadImage(selectedFile.file).subscribe(
        (res: any) => {
          console.log(res);
          this.currentBody.imageUrl = res.fileUrl;
        },
        (err) => {
          console.log(err);
        })
    });

    reader.readAsDataURL(file);
  }
}
