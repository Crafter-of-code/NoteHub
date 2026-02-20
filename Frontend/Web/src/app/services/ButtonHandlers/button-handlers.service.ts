import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ButtonHandlersService {
  constructor(private router: Router) {}
  initizalHeaderButton: boolean = false;
  goToLoginPage() {
    this.router.navigate(['login'], { replaceUrl: true });
  }
  goToSiginPage() {
    this.router.navigate(['signin']);
  }
  getToSettingPage() {
    this.router.navigate(['home', 'setting']);
  }
}
