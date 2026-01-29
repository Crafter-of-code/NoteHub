import { Component } from '@angular/core';
import { WelcomeHeaderComponent } from '../../components/welcome-header/welcome-header.component';
import { TypewritterComponent } from '../../components/typewritter/typewritter.component';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { OutlineButtonComponent } from '../../components/outline-button/outline-button.component';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
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
export class WelcomeComponent implements OnInit {
  constructor(private router: Router, private seo: SetSeoService) {}
  ngOnInit(): void {
    this.seo.setSeo({
      title: 'NoteHub – Simple & Smart Note Taking App',
      description:
        'NoteHub is a simple and smart note taking app to write, save, and organize notes easily. Stay productive with a clean and fast notes app.',
      keyword:
        'note taking app, simple notes app, write notes online, smart note app, productivity notes, notehub',
    });
  }

  loginButtonHandler = () => {
    this.router.navigate(['login']);
  };
  singinButtonHandle = () => {
    this.router.navigate(['signin']);
  };
}
