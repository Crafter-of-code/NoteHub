import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ButtonHandlersService {
  constructor(private router: Router) {}
  welcomePageLoginButtonHandler() {
    this.router.navigate(['/login']);
  }
}
