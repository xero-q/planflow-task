import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  boardId: string = '';
  fullName: string = '';
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
}
