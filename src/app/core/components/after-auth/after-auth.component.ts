import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';
import User from '../../../shared/interfaces/user';
import { StateService } from '../../services/state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-after-auth',
  imports: [],
  templateUrl: './after-auth.component.html',
  styleUrl: './after-auth.component.scss',
})
export class AfterAuthComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private trelloService: TrelloService,
    private stateService: StateService,
    private router: Router
  ) {}

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
