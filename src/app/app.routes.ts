import { Routes } from '@angular/router';
import { AfterAuthComponent } from './core/components/after-auth/after-auth.component';
import { LoginComponent } from './core/components/login/login.component';
import { TrelloAccountComponent } from './core/components/trello-account/trello-account.component';

export const routes: Routes = [
  {
    path: 'after-auth',
    component: AfterAuthComponent,
  },
  {
    path: 'trello-account',
    component: TrelloAccountComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
