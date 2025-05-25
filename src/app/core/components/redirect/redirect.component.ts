import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
})
export class RedirectComponent {
  constructor() {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    router.navigate([token ? '/dashboard' : '/login']);
  }
}
