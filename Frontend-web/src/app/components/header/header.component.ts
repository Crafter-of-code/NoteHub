import { Component, OnInit } from '@angular/core';
import { appHeading } from '../../constants/appDetails';
import { OutlineButtonComponent } from '../outline-button/outline-button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
@Component({
  selector: 'app-header',
  imports: [OutlineButtonComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: Router,
    private activedRoute: ActivatedRoute,
    private buttonHandler: ButtonHandlersService
  ) {
    this.clicked = this.buttonHandler.initizalHeaderButton;
  }
  imageUrl: string = 'asset/settings.png';
  clicked: boolean;

  appHeading?: string = appHeading;
  ngOnInit(): void {
    console.log();
  }
  button_click() {
    if (this.clicked) {
      this.clicked = !this.clicked;
      this.imageUrl = 'asset/settings.png';
      this.route.navigate([`${this.activedRoute.snapshot.url[0].path}`]);
    } else {
      this.clicked = !this.clicked;
      this.imageUrl = 'asset/home.png';
      this.route.navigate(['1', 'setting']);
    }
  }
}
