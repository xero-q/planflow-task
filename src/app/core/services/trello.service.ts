import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import TrelloBoard from '../../shared/interfaces/trello-board';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  constructor(private httpClient: HttpClient) {}

  getBoards(): Observable<TrelloBoard[]> {
    const token = this.getToken();
    const API_KEY = environment.TRELLO_API_KEY;
    return this.httpClient.get<TrelloBoard[]>(
      `https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${token}`
    );
  }

  getLists(boardId: string) {
    const token = this.getToken();
    const API_KEY = environment.TRELLO_API_KEY;

    return this.httpClient.get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${token}`
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
