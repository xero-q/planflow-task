import { Component, Input, signal, WritableSignal } from '@angular/core';
import TrelloList from '../../../shared/interfaces/trello-list';
import { TrelloService } from '../../services/trello.service';
import TrelloCard from '../../../shared/interfaces/trello-card';
import { TrelloCardComponent } from '../trello-card/trello-card.component';
import { Router } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { FormCardComponent } from '../form-card/form-card.component';
import { ToastrService } from 'ngx-toastr';
import { MetricsService } from '../../services/metrics.service';

@Component({
  selector: 'app-trello-list',
  imports: [
    TrelloCardComponent,
    NgStyle,
    NgIf,
    ModalComponent,
    FormCardComponent,
  ],
  templateUrl: './trello-list.component.html',
  styleUrl: './trello-list.component.scss',
})
export class TrelloListComponent {
  @Input('list') list!: TrelloList;
  cardsList: WritableSignal<TrelloCard[]> = signal([]);
  displayCardForm = false;

  constructor(
    private trelloService: TrelloService,
    private metricsService: MetricsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.trelloService.getCards(this.list.id).subscribe({
      next: (cards: TrelloCard[]) => {
        this.cardsList.set(cards);
        this.metricsService.addBoardMetrics(
          this.list.idBoard,
          this.list.id,
          this.list.name,
          cards.map((card) => {
            return { name: card.name, description: card.desc };
          })
        );
      },
      error: () => {
        this.toastr.error('Error loading cards', 'Error');
      },
    });
  }

  onCardClick(cardId: string) {
    this.router.navigate(['/trello-card', cardId]);
  }

  openModal() {
    this.displayCardForm = true;
    console.log(this.displayCardForm);
  }

  closeModal() {
    this.displayCardForm = false;
  }

  onCardAddedAndClose() {
    this.loadCards();
    this.closeModal();
  }
}
