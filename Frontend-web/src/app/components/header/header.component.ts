import { Component } from '@angular/core';
import { appHeading } from '../../constants/appDetails';
import { OutlineButtonComponent } from '../outline-button/outline-button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [OutlineButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  imageUrl: string = 'settings.png';
  appHeading?: string = appHeading || 'hello';
  constructor(private route: Router) {}
  button_click() {
    this.route.navigate(['home/setting']);
  }
}
