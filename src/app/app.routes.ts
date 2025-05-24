import { Routes } from '@angular/router';
import { AfterAuthComponent } from './core/components/after-auth/after-auth.component';
import { LoginComponent } from './core/components/login/login.component';
import { TrelloAccountComponent } from './core/components/trello-account/trello-account.component';
import { TrelloBoardComponent } from './core/components/trello-board/trello-board.component';
import { TrelloCardComponent } from './core/components/trello-card/trello-card.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'after-auth',
    component: AfterAuthComponent,
  },
  {
    path: 'trello-account',
    component: TrelloAccountComponent,
  },
  {
    path: 'trello-board/:id',
    component: TrelloBoardComponent,
  },
  {
    path: 'trello-card/:id',
    component: TrelloCardComponent,
  },
];
