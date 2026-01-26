import { Component } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { SolidButtonComponent } from '../../../components/solid-button/solid-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [SolidButtonComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginHandler(userForm: NgForm) {
    if (userForm.valid) {
      console.log(userForm.value.name);
    } else {
      console.log('the form is not valid');
    }
  }
}
