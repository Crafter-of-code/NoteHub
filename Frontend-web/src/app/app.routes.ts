import { Routes } from '@angular/router';
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
      import('./pages/auth/login/login.component').then(
        (comp) => comp.LoginComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/auth/signin/signin.component').then(
        (page) => page.SigninComponent
      ),
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
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (page) => page.NotFoundComponent
      ),
  },
];
