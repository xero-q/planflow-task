import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrelloService } from './core/services/trello.service';
import { TrelloAccountComponent } from './core/components/trello-account/trello-account.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrelloAccountComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'planflow';

  trelloService = inject(TrelloService);
  isLoggedIn = !!this.trelloService.getToken();
}
