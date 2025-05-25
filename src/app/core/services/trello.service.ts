import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import TrelloBoard from '../../shared/interfaces/trello-board';
import TrelloList from '../../shared/interfaces/trello-list';
import TrelloCard from '../../shared/interfaces/trello-card';
import User from '../../shared/interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  API_KEY = environment.TRELLO_API_KEY;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getUserInfo(): Observable<User> {
    const token = this.authService.getToken();
    const url = `https://api.trello.com/1/members/me?key=${this.API_KEY}&token=${token}`;
    return this.httpClient.get<User>(url);
  }

  getBoards(): Observable<TrelloBoard[]> {
    const token = this.authService.getToken();
    return this.httpClient.get<TrelloBoard[]>(
      `https://api.trello.com/1/members/me/boards?key=${this.API_KEY}&token=${token}`
    );
  }

  getLists(boardId: string): Observable<TrelloList[]> {
    const token = this.authService.getToken();
    return this.httpClient.get<TrelloList[]>(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${this.API_KEY}&token=${token}`
    );
  }

  getCards(listId: string): Observable<TrelloCard[]> {
    const token = this.authService.getToken();
    return this.httpClient.get<TrelloCard[]>(
      `https://api.trello.com/1/lists/${listId}/cards?key=${this.API_KEY}&token=${token}`
    );
  }

  getSingleCard(cardId: string): Observable<TrelloCard> {
    const token = this.authService.getToken();
    return this.httpClient.get<TrelloCard>(
      `https://api.trello.com/1/cards/${cardId}?key=${this.API_KEY}&token=${token}`
    );
  }

  addNewBoard(boardName: string): Observable<TrelloBoard> {
    const url = 'https://api.trello.com/1/boards/';
    const params = new HttpParams()
      .set('name', boardName)
      .set('key', this.API_KEY)
      .set('token', this.authService.getToken() ?? '');

    return this.httpClient.post<TrelloBoard>(url, null, { params });
  }

  addNewCard(cardName: string, idList: string): Observable<TrelloCard> {
    const url = 'https://api.trello.com/1/cards/';
    const params = new HttpParams()
      .set('name', cardName)
      .set('idList', idList)
      .set('key', this.API_KEY)
      .set('token', this.authService.getToken() ?? '');

    return this.httpClient.post<TrelloCard>(url, null, { params });
  }

  updateCard(
    cardId: string,
    cardName: string,
    cardDesc: string
  ): Observable<TrelloCard> {
    const updateFields = {
      name: cardName,
      desc: cardDesc,
    };
    const token = this.authService.getToken();

    const url = `https://api.trello.com/1/cards/${cardId}?key=${this.API_KEY}&token=${token}`;

    return this.httpClient.put<TrelloCard>(url, updateFields, {});
  }
}
