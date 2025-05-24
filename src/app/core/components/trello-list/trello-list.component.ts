import { Component, Input, signal, WritableSignal } from '@angular/core';
import TrelloList from '../../../shared/interfaces/trello-list';
import { TrelloService } from '../../services/trello.service';
import TrelloCard from '../../../shared/interfaces/trello-card';
import { TrelloCardComponent } from '../trello-card/trello-card.component';

@Component({
  selector: 'app-trello-list',
  imports: [TrelloCardComponent],
  templateUrl: './trello-list.component.html',
  styleUrl: './trello-list.component.scss',
})
export class TrelloListComponent {
  @Input('list') list!: TrelloList;
  cardsList: WritableSignal<TrelloCard[]> = signal([]);

  constructor(private trelloService: TrelloService) {}

  ngOnInit(): void {
    this.trelloService.getCards(this.list.id).subscribe((cards) => {
      this.cardsList.set(cards);
    });
  }
}
