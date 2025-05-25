import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  boardId: string = '';
  fullName: string = '';
  constructor() {}

  setBoardId(id: string): void {
    this.boardId = id;
  }
  getBoardId(): string {
    return this.boardId;
  }

  setFullName(name: string): void {
    this.fullName = name;
  }
  getFullName(): string {
    return this.fullName;
  }
}
