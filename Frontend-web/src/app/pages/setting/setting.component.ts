import { Component, OnInit } from '@angular/core';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { settingPageSeo } from '../../constants/seoData';
import { HttpService } from '../../services/http/http.service';
import { CommonModule } from '@angular/common';
import { UserDetailEditorComponent } from '../../components/user-detail-editor/user-detail-editor.component';
import { Router } from '@angular/router';
import { ResponseStatusComponent } from '../../components/response-status/response-status.component';
@Component({
  selector: 'app-setting',
  imports: [
    SolidButtonComponent,
    CommonModule,
    UserDetailEditorComponent,
    ResponseStatusComponent,
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent implements OnInit {
  userData = {
    userName: '',
    userEmail: '',
  };
  errorStatus: boolean = true;
  reponseMessage: string = '';
  showEditor: boolean = false;
  editOperation: string = '';
  defaultValueToEdit: string = '';
  constructor(
    private seo: SetSeoService,
    private http: HttpService,
    private router: Router
  ) {}
  userImage: string = 'asset/user.png';
  responseSetter(status: boolean, message: string) {
    this.errorStatus = status;
    this.reponseMessage = message;
    setTimeout(() => {
      this.errorStatus = false;
      this.reponseMessage = '';
    }, 3000);
  }
  getUserDetail() {
    this.http.getUserDetail().subscribe({
      next: (data) => {
        this.userData.userName = data.userName;
        this.userData.userEmail = data.userEmail;
      },
      error: (err) => {
        this.responseSetter(
          true,
          'we are facing some error while getting the user detail'
        );
      },
    });
  }
  ngOnInit(): void {
    this.seo.setSeo(settingPageSeo);
    this.getUserDetail();
  }
  toggleShowEditorForUserName() {
    this.showEditor = true;
    this.editOperation = 'userName';
    this.defaultValueToEdit = this.userData.userName;
  }
  toggleShowEditorForUserEmail() {
    this.showEditor = true;
    this.editOperation = 'userEmail';
    this.defaultValueToEdit = this.userData.userEmail;
  }
  toggleShowEditorForUserPassword() {
    this.showEditor = true;
    this.editOperation = 'userPassword';
    this.defaultValueToEdit = '*********';
  }
}
