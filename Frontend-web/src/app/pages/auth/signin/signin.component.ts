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

@Component({
  selector: 'app-signin',
  imports: [OutlineButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  constructor(private seo: SetSeoService) {}
  ngOnInit(): void {
    this.seo.setSeo(singinPageSeo);
  }
  signinForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    checkBox: new FormControl(false, Validators.required),
  });
  signinHandler() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
    } else {
      console.log('yourm form is not valid');
    }
  }
}
