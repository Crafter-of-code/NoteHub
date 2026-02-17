import { Component } from '@angular/core';
import { TypewritterComponent } from '../../components/typewritter/typewritter.component';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { OutlineButtonComponent } from '../../components/outline-button/outline-button.component';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { appHeading } from '../../constants/appDetails';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
@Component({
  selector: 'app-welcome',
  imports: [TypewritterComponent, SolidButtonComponent, OutlineButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  constructor(
    private router: Router,
    private seo: SetSeoService,
    private buttonEvent: ButtonHandlersService,
    private route: Router
  ) {}
  appHeading: string = appHeading;
  ngOnInit(): void {
    this.seo.setSeo({
      title: 'NoteHub – Simple & Smart Note Taking App',
      description:
        'NoteHub is a simple and smart note taking app to write, save, and organize notes easily. Stay productive with a clean and fast notes app.',
      keyword:
        'note taking app, simple notes app, write notes online, smart note app, productivity notes, notehub',
    });
    if (localStorage.getItem('token')) {
      this.route.navigate(['/', 'home'], { replaceUrl: true });
    }
  }
  loginButtonHandler = () => {
    this.buttonEvent.goToLoginPage();
  };
  singinButtonHandle = () => {
    this.buttonEvent.goToSiginPage();
  };
}
