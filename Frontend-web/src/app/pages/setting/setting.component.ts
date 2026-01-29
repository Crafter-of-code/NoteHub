import { Component } from '@angular/core';
import { OutlineButtonComponent } from '../../components/outline-button/outline-button.component';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';

@Component({
  selector: 'app-setting',
  imports: [OutlineButtonComponent, SolidButtonComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  image: string = 'asset/user.png';
  user: { name: string; email: string } = {
    name: 'uzair',
    email: 'uzair@gmail.com',
  };
}
