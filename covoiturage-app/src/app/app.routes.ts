import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search').then(m => m.SearchComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-ride/create-ride').then(m => m.CreateRideComponent),
  },
  {
    path: 'my-rides',
    loadComponent: () => import('./pages/my-rides/my-rides').then(m => m.MyRidesComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'register', 
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },

];

