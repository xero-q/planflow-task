/**
 * @class TrelloCardComponent
 * @description Component that displays and manages a single Trello card
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../core/components/loader/loader.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { FormCardComponent } from '../../core/components/form-card/form-card.component';
import TrelloCard from '../../shared/interfaces/trello-card';
import { TrelloService } from '../../core/services/trello.service';
import { StateService } from '../../core/services/state.service';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Component that displays and manages a single Trello card
 * Handles card loading, editing, and deletion
 */
@Component({
  selector: 'app-trello-card',
  imports: [
    MarkdownModule,
    LoaderComponent,
    ModalComponent,
    FormCardComponent,
    NgStyle,
    NgIf,
  ],
  templateUrl: './trello-card.component.html',
  styleUrl: './trello-card.component.scss',
})
export class TrelloCardComponent implements OnInit {
  /**
   * Input property that receives the card data
   * @input
   */
  @Input() card: TrelloCard | null = null;

  /**
   * Current card ID
   */
  cardId: string | null = null;

  /**
   * Flag indicating if the component is loading
   */
  isLoading = true;

  /**
   * Flag controlling the visibility of the card edit form
   */
  displayCardForm = false;

  /**
   * Constructor that initializes the component with required services
   * @param trelloService - Service for Trello API interactions
   * @param route - Router service for accessing route parameters
   * @param stateService - Service for managing application state
   * @param router - Navigation service
   * @param toastr - Toast notification service
   */
  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /**
   * Lifecycle hook that initializes the component
   */
  ngOnInit(): void {
    this.loadCard();
  }

  /**
   * Loads or refreshes the card data from Trello API
   * @param refresh - Flag indicating if this is a refresh operation
   */
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
                this.toastr.error('Error loading card');
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
          this.toastr.error('Error loading card');
          this.router.navigate(['/trello-board', this.card?.idBoard]);
        },
      });
    }
  }

  /**
   * Navigates to the board view
   */
  goToBoard(): void {
    this.router.navigate(['/trello-board', this.card?.idBoard]);
  }

  /**
   * Navigates to the board view
   */
  goToCard(): void {
    this.router.navigate(['/trello-card', this.card?.id]);
  }

  /**
   * Opens the card edit form
   */
  openModal(): void {
    this.displayCardForm = true;
  }

  /**
   * Closes the card edit form
   */
  closeModal(): void {
    this.displayCardForm = false;
  }

  /**
   * Handles card update success
   * Reloads the card data and hides the form
   */
  onCardUpdatedAndClose(): void {
    this.loadCard(true);
    this.closeModal();
  }

  /**
   * Handles Enter or Space on Card
   * @param event - Keyboard event object
   */
  onKeydownCard(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.goToCard();
    }
  }
}
