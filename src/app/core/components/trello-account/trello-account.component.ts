import { Component, signal, WritableSignal } from '@angular/core';
import { TrelloService } from '../../services/trello.service';
import { map } from 'rxjs';
import { TrelloBoardComponent } from '../trello-board/trello-board.component';
import TrelloBoard from '../../../shared/interfaces/trello-board';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { FormBoardComponent } from '../form-board/form-board.component';
import { NgIf, NgStyle } from '@angular/common';
import { StateService } from '../../services/state.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-trello-account',
  imports: [LoaderComponent, FormBoardComponent, NgStyle, NgIf, ModalComponent],
  templateUrl: './trello-account.component.html',
  styleUrl: './trello-account.component.scss',
})
export class TrelloAccountComponent {
  boardsList: WritableSignal<TrelloBoard[]> = signal([]);
  isLoading = true;
  displayBoardForm = false;

  constructor(
    private trelloService: TrelloService,
    private router: Router,
    public stateService: StateService
  ) {}

  ngOnInit() {
    this.loadBoards();
  }

  loadBoards(): void {
    this.trelloService
      .getBoards()
      .pipe(
        map((boards: TrelloBoard[]) => boards.filter((board) => !board.closed))
      )
      .subscribe({
        next: (boards: TrelloBoard[]) => {
          this.boardsList.set(boards);
          this.isLoading = false;
        },
        error: (err: any) => {
          this.isLoading = false;
        },
      });
  }

  onBoardSelected(event: any) {
    if (event && event.target.value) {
      this.router.navigate(['/trello-board', event.target.value]);
    }
  }

  openModal() {
    this.displayBoardForm = true;
  }

  closeModal() {
    this.displayBoardForm = false;
  }

  onBoardAddedAndClose() {
    this.loadBoards();
    this.closeModal();
  }
}
