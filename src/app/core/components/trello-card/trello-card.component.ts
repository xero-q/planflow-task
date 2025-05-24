import { Component, Input } from '@angular/core';
import TrelloCard from '../../../shared/interfaces/trello-card';
import { ActivatedRoute } from '@angular/router';
import { TrelloService } from '../../services/trello.service';

@Component({
  selector: 'app-trello-card',
  imports: [],
  templateUrl: './trello-card.component.html',
  styleUrl: './trello-card.component.scss',
})
export class TrelloCardComponent {
  @Input('card') card: TrelloCard | null = null;
  cardId: string | null = null;
  isLoading = true;

  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.card) {
      this.route.paramMap.subscribe((params: any) => {
        this.cardId = params.get('id');

        if (this.cardId) {
          this.trelloService
            .getSingleCard(this.cardId)
            .subscribe((card: TrelloCard) => {
              this.card = { ...card };
              this.isLoading = false;
            });
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}
