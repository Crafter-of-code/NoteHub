import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(
        (comp) => comp.LoginComponent
      ),
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (page) => page.HomeComponent
          ),
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./pages/setting/setting.component').then(
            (page) => page.SettingComponent
          ),
      },
    ],
  },
];
