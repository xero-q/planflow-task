/**
 * @class AfterAuthComponent
 * @description Component that handles the OAuth callback after Trello authentication
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';
import User from '../../../shared/interfaces/user';
import { StateService } from '../../services/state.service';
import { AuthService } from '../../services/auth.service';

/**
 * Component that processes the OAuth callback after Trello authentication
 * Manages token handling and user information retrieval
 */
@Component({
  selector: 'app-after-auth',
  imports: [],
  templateUrl: './after-auth.component.html',
  styleUrl: './after-auth.component.scss',
})
export class AfterAuthComponent implements OnInit {
  /**
   * Constructor that initializes the component with required services
   * @param route - Router service for accessing URL parameters
   * @param authService - Service for handling authentication
   * @param trelloService - Service for Trello API interactions
   * @param stateService - Service for managing application state
   * @param router - Navigation service
   */
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private trelloService: TrelloService,
    private stateService: StateService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that initializes the component
   * Handles OAuth token and retrieves user information
   */
  ngOnInit() {
    const token = this.route.snapshot.fragment?.split('=')[1];
    if (token) {
      this.authService.login(token);
      this.trelloService.getUserInfo().subscribe((user: User) => {
        this.stateService.setFullName(user.fullName);
      });
    }
    this.router.navigate(['/dashboard']);
  }
}
