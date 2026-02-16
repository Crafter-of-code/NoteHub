import { Component, OnInit } from '@angular/core';
import { OutlineButtonComponent } from '../../../components/outline-button/outline-button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SetSeoService } from '../../../services/seo/set-seo.service';
import { singinPageSeo } from '../../../constants/seoData';
import { HttpService } from '../../../services/http/http.service';
import { ResponseStatusComponent } from '../../../components/response-status/response-status.component';

@Component({
  selector: 'app-signin',
  imports: [
    OutlineButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    ResponseStatusComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  button_disable: Boolean = false;
  errorStatus = false;
  reponseMessage = '';
  constructor(private seo: SetSeoService, private http: HttpService) {}
  ngOnInit(): void {
    this.seo.setSeo(singinPageSeo);
  }
  signinForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', Validators.required),
    checkBox: new FormControl(false, Validators.required),
  });
  signinHandler() {
    this.button_disable = false;
    if (this.signinForm.valid) {
      if (
        this.signinForm.get('password')?.value !=
        this.signinForm.get('confirmPassword')?.value
      ) {
        console.error('you password is not same');
        this.signinForm.invalid;
      } else {
        const data = {
          userName: this.signinForm.get('name')?.value,
          userEmail: this.signinForm.get('email')?.value,
          userPassword: this.signinForm.get('password')?.value,
        };
        this.http.signIn(data).subscribe({
          next: (data) => {
            this.errorStatus = data.errorStatus;
            this.reponseMessage = data.message;
            this.button_disable = false;
            setTimeout(() => {
              this.errorStatus = false;
              this.reponseMessage = '';
            }, 2000);
          },
          error: (data) => {
            this.reponseMessage = 'problem while communicating to the backed';
            this.button_disable = false;
            setTimeout(() => {
              this.reponseMessage = '';
            }, 3000);
          },
        });
      }
    } else {
      console.log('yourm form is not valid');
    }
  }
}
