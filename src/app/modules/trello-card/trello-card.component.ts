import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../core/components/loader/loader.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { FormCardComponent } from '../../core/components/form-card/form-card.component';
import TrelloCard from '../../shared/interfaces/trello-card';
import { TrelloService } from '../../core/services/trello.service';
import { StateService } from '../../core/services/state.service';

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
    private router: Router,
    private toastr: ToastrService
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
            this.trelloService.getSingleCard(this.cardId).subscribe({
              next: (card: TrelloCard) => {
                this.card = { ...card };
                this.stateService.setBoardId(this.card.idBoard);
                this.isLoading = false;
              },
              error: () => {
                this.isLoading = false;
                this.toastr.error('Error loading card', 'Error');
                this.router.navigate(['/dashboard']);
              },
            });
          }
        });
      } else {
        this.isLoading = false;
      }
    } else {
      this.isLoading = true;
      this.trelloService.getSingleCard(this.cardId ?? '').subscribe({
        next: (card: TrelloCard) => {
          this.card = { ...card };
          this.stateService.setBoardId(this.card.idBoard);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error('Error loading card', 'Error');
          this.router.navigate(['/trello-board', this.card?.idBoard]);
        },
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
