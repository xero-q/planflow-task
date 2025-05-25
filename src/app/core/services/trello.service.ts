import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import TrelloBoard from '../../shared/interfaces/trello-board';
import TrelloList from '../../shared/interfaces/trello-list';
import TrelloCard from '../../shared/interfaces/trello-card';
import User from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  API_KEY = environment.TRELLO_API_KEY;

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public hasToken(): boolean {
    return !!this.getToken();
  }

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const hasToken = this.hasToken();
    this.isLoggedInSubject.next(hasToken);
  }

  getUserInfo(): Observable<User> {
    const url = `https://api.trello.com/1/members/me?key=${
      this.API_KEY
    }&token=${this.getToken()}`;
    return this.httpClient.get<User>(url);
  }

  getBoards(): Observable<TrelloBoard[]> {
    return this.httpClient.get<TrelloBoard[]>(
      `https://api.trello.com/1/members/me/boards?key=${
        this.API_KEY
      }&token=${this.getToken()}`
    );
  }

  getLists(boardId: string): Observable<TrelloList[]> {
    return this.httpClient.get<TrelloList[]>(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${
        this.API_KEY
      }&token=${this.getToken()}`
    );
  }

  getCards(listId: string): Observable<TrelloCard[]> {
    return this.httpClient.get<TrelloCard[]>(
      `https://api.trello.com/1/lists/${listId}/cards?key=${
        this.API_KEY
      }&token=${this.getToken()}`
    );
  }

  getSingleCard(cardId: string): Observable<TrelloCard> {
    return this.httpClient.get<TrelloCard>(
      `https://api.trello.com/1/cards/${cardId}?key=${
        this.API_KEY
      }&token=${this.getToken()}`
    );
  }

  addNewBoard(boardName: string): Observable<TrelloBoard> {
    const url = 'https://api.trello.com/1/boards/';
    const params = new HttpParams()
      .set('name', boardName)
      .set('key', this.API_KEY)
      .set('token', this.getToken() ?? '');

    return this.httpClient.post<TrelloBoard>(url, null, { params });
  }

  addNewCard(cardName: string, idList: string): Observable<TrelloCard> {
    const url = 'https://api.trello.com/1/cards/';
    const params = new HttpParams()
      .set('name', cardName)
      .set('idList', idList)
      .set('key', this.API_KEY)
      .set('token', this.getToken() ?? '');

    return this.httpClient.post<TrelloCard>(url, null, { params });
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
