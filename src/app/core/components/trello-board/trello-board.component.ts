import { Component, Input } from '@angular/core';
import TrelloBoard from '../../../shared/interfaces/trello-board';

@Component({
  selector: 'app-trello-board',
  imports: [],
  templateUrl: './trello-board.component.html',
  styleUrl: './trello-board.component.scss',
})
export class TrelloBoardComponent {
  @Input('board') board!: TrelloBoard;
}
