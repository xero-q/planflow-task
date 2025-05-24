import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
})
export class RedirectComponent {
  constructor() {
    const trelloService = inject(TrelloService);
    const router = inject(Router);
    const token = trelloService.getToken();

    router.navigate([token ? '/trello-account' : '/login']);
  }
}
