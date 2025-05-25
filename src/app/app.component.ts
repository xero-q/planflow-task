import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrelloService } from './core/services/trello.service';
import { TrelloAccountComponent } from './core/components/trello-account/trello-account.component';
import { UserMenuComponent } from './core/components/user-menu/user-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrelloAccountComponent, UserMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'planflow';
  trelloService = inject(TrelloService);

  isLoggedIn = this.trelloService.hasToken();

  ngOnInit() {
    this.trelloService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
