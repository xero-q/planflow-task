import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  CardMetrics,
  ListMetrics,
  UserMetrics,
} from '../../shared/interfaces/metrics';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  boardId: string = '';
  fullName: string = '';
  userMetrics: UserMetrics = { boards: [] };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const name = localStorage.getItem('fullName');
      this.fullName = name ?? '';
    }
  }

  setBoardId(id: string): void {
    this.boardId = id;
  }
  getBoardId(): string {
    return this.boardId;
  }

  setFullName(name: string): void {
    this.fullName = name;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('fullName', name);
    }
  }
  getFullName(): string {
    return this.fullName;
  }

  addBoardMetrics(
    boardId: string,
    listId: string,
    listName: string,
    cards: CardMetrics[]
  ) {
    const board = this.userMetrics.boards.find((b) => b.id === boardId);
    if (board) {
      const list = board.lists.find(
        (listMetrics: ListMetrics) => listMetrics.id === listId
      );
      if (list) {
        list.cards = [...cards];
      } else {
        board.lists.push({
          id: listId,
          name: listName,
          cards: [...cards],
        });
      }
    } else {
      this.userMetrics.boards.push({
        id: boardId,
        lists: [
          {
            id: listId,
            name: listName,
            cards: [...cards],
          },
        ],
      });
    }
  }

  getBoardMetrics(boardId: string): ListMetrics[] {
    const board = this.userMetrics.boards.find((b) => b.id === boardId);
    if (board) {
      return board.lists.sort((a, b) => a.id.localeCompare(b.id));
    } else {
      return [];
    }
  }
}
