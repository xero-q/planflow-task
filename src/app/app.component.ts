import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrelloAccountComponent } from './core/components/trello-account/trello-account.component';
import { UserMenuComponent } from './core/components/user-menu/user-menu.component';
import { AuthService } from './core/services/auth.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrelloAccountComponent, UserMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'planflow';
  authService = inject(AuthService);

  isLoggedIn = !!this.authService.getToken();

  constructor(private meta: Meta, private titleService: Title) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.titleService.setTitle('PlanFlow - Anibal Sanchez');
    this.meta.addTags([
      {
        name: 'description',
        content: 'This App allows to manage your Trello account',
      },
      { name: 'keywords', content: 'Trello, Treew Inc., Anibal Sanchez' },
      { name: 'author', content: 'Anibal Sanchez Numa' },
    ]);
  }
}
