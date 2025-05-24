import { Component, Input } from '@angular/core';
import TrelloCard from '../../../shared/interfaces/trello-card';

@Component({
  selector: 'app-trello-card',
  imports: [],
  templateUrl: './trello-card.component.html',
  styleUrl: './trello-card.component.scss',
})
export class TrelloCardComponent {
  @Input('card') card!: TrelloCard;
}
