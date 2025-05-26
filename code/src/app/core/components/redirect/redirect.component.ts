/**
 * @class RedirectComponent
 * @description Component that handles application routing based on authentication state
 */
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';
import { AuthService } from '../../services/auth.service';

/**
 * Component that redirects users to appropriate routes based on authentication
 * Redirects to dashboard if authenticated, otherwise to login page
 */
@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
})
export class RedirectComponent {
  /**
   * Constructor that handles the redirection logic
   * Checks authentication state and redirects accordingly
   */
  constructor() {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    router.navigate([token ? '/dashboard' : '/login']);
  }
}
