import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  boardId: string = '';
  constructor() {}

  setBoardId(id: string): void {
    this.boardId = id;
  }
  getBoardId(): string {
    return this.boardId;
  }
}
