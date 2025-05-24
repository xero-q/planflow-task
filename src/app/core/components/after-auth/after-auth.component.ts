import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';

@Component({
  selector: 'app-after-auth',
  imports: [],
  templateUrl: './after-auth.component.html',
  styleUrl: './after-auth.component.scss',
})
export class AfterAuthComponent {
  constructor(
    private route: ActivatedRoute,
    private trelloService: TrelloService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.fragment?.split('=')[1];
    if (token) {
      this.trelloService.saveToken(token);
      this.router.navigate(['/trello-account']);
    }
  }
}
