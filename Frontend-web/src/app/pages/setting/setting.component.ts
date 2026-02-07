import { Component, OnInit } from '@angular/core';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { settingPageSeo } from '../../constants/seoData';
@Component({
  selector: 'app-setting',
  imports: [SolidButtonComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent implements OnInit {
  constructor(private seo: SetSeoService) {}
  userImage: string = 'asset/user.png';
  user: { name: string; email: string } = {
    name: 'uzair',
    email: 'uzair@gmail.com',
  };
  ngOnInit(): void {
    this.seo.setSeo(settingPageSeo);
  }
}
