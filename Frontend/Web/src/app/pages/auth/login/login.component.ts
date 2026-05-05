import { Component } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { SolidButtonComponent } from '../../../components/solid-button/solid-button.component';
import { CommonModule } from '@angular/common';
import { SetSeoService } from '../../../services/seo/set-seo.service';
import { loginPageSeo } from '../../../constants/seoData';
import { HttpService } from '../../../services/http/http.service';
import { responseDataType } from '../../../types/dataTypes';
import { Router } from '@angular/router';
import { ResponseStatusComponent } from '../../../components/response-status/response-status.component';
@Component({
  selector: 'app-login',
  imports: [
    SolidButtonComponent,
    FormsModule,
    CommonModule,
    ResponseStatusComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorStatus = false;
  reponseMessage = '';
  loginButtonDisable: boolean = false;
  constructor(
    private seo: SetSeoService,
    private http: HttpService,
    private route: Router
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.route.navigate(['/', 'home'], { replaceUrl: true });
    }
    this.seo.setSeo(loginPageSeo);
  }
  loginHandler(userForm: NgForm) {
    this.loginButtonDisable = true;
    console.log('button disabled' + this.loginButtonDisable);
    if (userForm.valid) {
      const data = {
        userEmail: userForm.value.userEmail,
        userPassword: userForm.value.userPassword,
      };
      this.http.logIn(data).subscribe({
        next: (data) => {
          if (data.token) {
            localStorage.setItem('token', `Bearer ${data.token}`);
            this.reponseMessage = data.message || '';
            this.errorStatus = data.errorStatus ?? false;

            setTimeout(() => {
              this.loginButtonDisable = false;
              this.route.navigate(['home']);
            }, 1000);
          } else {
            this.reponseMessage = data.message || '';
            this.errorStatus = data.errorStatus || false;

            setTimeout(() => {
              this.errorStatus = false;
              this.reponseMessage = '';
              this.loginButtonDisable = false;
            }, 2000);
          }
        },
        error: () => {
          this.reponseMessage = 'unable to communitcate to our backend service';
          this.errorStatus = true;

          setTimeout(() => {
            this.errorStatus = false;
            this.reponseMessage = '';
            this.loginButtonDisable = false;
          }, 2000);
        },
      });
    } else {
      this.errorStatus = true;
      this.reponseMessage = 'please check your data';
      setTimeout(() => {
        this.reponseMessage = '';
      }, 3000);
      this.loginButtonDisable = false;
    }
  }
}
