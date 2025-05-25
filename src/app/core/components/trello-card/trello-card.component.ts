import { Component, Input } from '@angular/core';
import TrelloCard from '../../../shared/interfaces/trello-card';
import { ActivatedRoute, Router } from '@angular/router';
import { TrelloService } from '../../services/trello.service';
import { LoaderComponent } from '../loader/loader.component';
import { StateService } from '../../services/state.service';
import { NgIf, NgStyle } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { FormCardComponent } from '../form-card/form-card.component';

@Component({
  selector: 'app-trello-card',
  imports: [LoaderComponent, ModalComponent, FormCardComponent, NgStyle, NgIf],
  templateUrl: './trello-card.component.html',
  styleUrl: './trello-card.component.scss',
})
export class TrelloCardComponent {
  @Input('card') card: TrelloCard | null = null;
  cardId: string | null = null;
  isLoading = true;
  displayCardForm = false;

  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard(refresh = false): void {
    if (!refresh) {
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
    } else {
      this.isLoading = true;
      this.trelloService
        .getSingleCard(this.cardId ?? '')
        .subscribe((card: TrelloCard) => {
          this.card = { ...card };
          this.stateService.setBoardId(this.card.idBoard);
          this.isLoading = false;
        });
    }
  }

  goToBoard(): void {
    this.router.navigate(['/trello-board', this.card?.idBoard]);
  }

  openModal() {
    this.displayCardForm = true;
  }

  closeModal() {
    this.displayCardForm = false;
  }

  onCardUpdatedAndClose() {
    this.loadCard(true);
    this.closeModal();
  }
}
