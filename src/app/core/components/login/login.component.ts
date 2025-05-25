import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginToTrello() {
    const apiKey = environment.TRELLO_API_KEY;
    const appUrl = environment.APP_URL;
    const redirectUri = `${appUrl}/after-auth`;
    const trelloAuthUrl = `https://trello.com/1/authorize?expiration=never&name=PlanFlow&scope=read,write&response_type=token&key=${apiKey}&return_url=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = trelloAuthUrl;
  }
}
