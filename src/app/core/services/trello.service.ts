import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import TrelloBoard from '../../shared/interfaces/trello-board';
import TrelloList from '../../shared/interfaces/trello-list';
import TrelloCard from '../../shared/interfaces/trello-card';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  API_KEY = environment.TRELLO_API_KEY;

  constructor(private httpClient: HttpClient) {}

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

  saveToken(token: string) {
    localStorage.setItem('trello_token', token);
  }
  getToken() {
    return localStorage.getItem('trello_token');
  }
  deleteToken() {
    localStorage.removeItem('trello_token');
  }
}
