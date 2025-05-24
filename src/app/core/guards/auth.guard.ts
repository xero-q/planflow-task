import { CanActivateFn, Router } from '@angular/router';
import { TrelloService } from '../services/trello.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const trelloService = inject(TrelloService);
  const trelloToken = trelloService.getToken();

  if (trelloToken) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
