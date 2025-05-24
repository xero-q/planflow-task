import { Component, signal, WritableSignal } from '@angular/core';
import { TrelloService } from '../../services/trello.service';
import { map } from 'rxjs';
import { TrelloBoardComponent } from '../trello-board/trello-board.component';
import TrelloBoard from '../../../shared/interfaces/trello-board';

@Component({
  selector: 'app-trello-account',
  imports: [TrelloBoardComponent],
  templateUrl: './trello-account.component.html',
  styleUrl: './trello-account.component.scss',
})
export class TrelloAccountComponent {
  boardsList: WritableSignal<TrelloBoard[]> = signal([]);

  constructor(private trelloService: TrelloService) {}

  ngOnInit() {
    this.trelloService
      .getBoards()
      .pipe(
        map((boards: TrelloBoard[]) => boards.filter((board) => !board.closed))
      )
      .subscribe((boards: TrelloBoard[]) => {
        this.boardsList.set(boards);
      });
  }
}
