import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/components/redirect/redirect.component').then(
        (m) => m.RedirectComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'after-auth',
    loadComponent: () =>
      import('./core/components/after-auth/after-auth.component').then(
        (m) => m.AfterAuthComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'trello-board/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/components/trello-board/trello-board.component').then(
        (m) => m.TrelloBoardComponent
      ),
  },
  {
    path: 'trello-card/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/components/trello-card/trello-card.component').then(
        (m) => m.TrelloCardComponent
      ),
  },
];
