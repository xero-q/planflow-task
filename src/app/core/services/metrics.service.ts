import { Injectable } from '@angular/core';
import { ListMetrics, UserMetrics } from '../../shared/interfaces/metrics';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  userMetrics: UserMetrics = { boards: [] };
  constructor() {}

  addBoardMetrics(
    boardId: string,
    listId: string,
    listName: string,
    totalCards: number
  ) {
    const board = this.userMetrics.boards.find((b) => b.id === boardId);
    if (board) {
      const list = board.lists.find((l: ListMetrics) => l.name === listName);
      if (list) {
        list.totalCards = totalCards;
      } else {
        board.lists.push({
          id: listId,
          name: listName,
          totalCards: totalCards,
        });
      }
    } else {
      this.userMetrics.boards.push({
        id: boardId,
        lists: [{ id: listId, name: listName, totalCards: totalCards }],
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
