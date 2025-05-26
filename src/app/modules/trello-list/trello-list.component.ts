import { Component, Input, signal, WritableSignal } from '@angular/core';
import { TrelloCardComponent } from '../trello-card/trello-card.component';
import { Router } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { FormCardComponent } from '../../core/components/form-card/form-card.component';
import TrelloList from '../../shared/interfaces/trello-list';
import { TrelloService } from '../../core/services/trello.service';
import { StateService } from '../../core/services/state.service';
import TrelloCard from '../../shared/interfaces/trello-card';

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
    private stateService: StateService,
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
        this.stateService.addBoardMetrics(
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
