import { Component, Input } from '@angular/core';
import TrelloCard from '../../../shared/interfaces/trello-card';
import { ActivatedRoute } from '@angular/router';
import { TrelloService } from '../../services/trello.service';
import { LoaderComponent } from '../loader/loader.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-trello-card',
  imports: [LoaderComponent],
  templateUrl: './trello-card.component.html',
  styleUrl: './trello-card.component.scss',
})
export class TrelloCardComponent {
  @Input('card') card: TrelloCard | null = null;
  cardId: string | null = null;
  isLoading = true;

  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute,
    private stateService: StateService
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
              this.stateService.setBoardId(this.card.idBoard);
              this.isLoading = false;
            });
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}
