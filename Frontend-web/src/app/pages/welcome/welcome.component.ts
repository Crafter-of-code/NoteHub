import { Component } from '@angular/core';
import { WelcomeHeaderComponent } from '../../components/welcome-header/welcome-header.component';
import { TypewritterComponent } from '../../components/typewritter/typewritter.component';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { OutlineButtonComponent } from '../../components/outline-button/outline-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [
    WelcomeHeaderComponent,
    TypewritterComponent,
    SolidButtonComponent,
    OutlineButtonComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  constructor(private router: Router) {}
  loginButtonHandler = () => {
    this.router.navigate(['login']);
  };
  singinButtonHandle = () => {
    this.router.navigate(['signin']);
  };
}
