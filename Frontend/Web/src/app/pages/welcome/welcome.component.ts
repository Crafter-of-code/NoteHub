import { Component, effect, signal, WritableSignal } from '@angular/core';
import { TypewritterComponent } from '../../components/typewritter/typewritter.component';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { OutlineButtonComponent } from '../../components/outline-button/outline-button.component';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { appHeading } from '../../constants/appDetails';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
import { single } from 'rxjs';
import { HttpService } from '../../services/http/http.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-welcome',
  imports: [
    TypewritterComponent,
    SolidButtonComponent,
    OutlineButtonComponent,
    CommonModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  serverCheckButtonStatus: WritableSignal<boolean> = signal<boolean>(true);
  reverseCounting: WritableSignal<number> = signal<number>(50);
  loginButtonHeading = 'Please Wait';
  signinButtonHeading = 'Please Wait';
  constructor(
    private http: HttpService,
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
    this.getServerStatus();
  }
  getServerStatus() {
    this.http.getServerStatus().subscribe({
      next: (data) => {
        this.loginButtonHeading = 'Login';
        this.signinButtonHeading = 'Creaet a new Account';
        this.serverCheckButtonStatus.set(false);
      },
      error: (err) => {
        this.loginButtonHeading = '503 Service Unavailable';
        this.signinButtonHeading = 'Try later';
        console.log(err);
      },
      complete: () => {
        console.log('compelted');
      },
    });
  }
  loginButtonHandler = () => {
    this.buttonEvent.goToLoginPage();
  };
  singinButtonHandle = () => {
    this.buttonEvent.goToSiginPage();
  };
}
