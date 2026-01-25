import { Component } from '@angular/core';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';

@Component({
  selector: 'app-welcome-header',
  imports: [],
  templateUrl: './welcome-header.component.html',
  styleUrl: './welcome-header.component.css',
})
export class WelcomeHeaderComponent {
  constructor(private buttonHandler: ButtonHandlersService) {}
}
