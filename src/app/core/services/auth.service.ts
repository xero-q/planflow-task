import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isLoggedInSubject.next(!!this.getToken());
  }

  login(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('trello_token', token);
      this.isLoggedInSubject.next(true);
    }
  }
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('trello_token');
    }
    return null;
  }

  logout() {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }
}
