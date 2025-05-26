/**
 * @class FormBoardComponent
 * @description Component that handles board creation form
 */
import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrelloService } from '../../services/trello.service';
import { Toast, ToastrService } from 'ngx-toastr';

/**
 * Component that provides a form for creating new Trello boards
 * Handles form validation and board creation
 */
@Component({
  selector: 'app-form-board',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-board.component.html',
  styleUrl: './form-board.component.scss',
})
export class FormBoardComponent {
  /**
   * Reactive form group for board creation
   */
  boardForm!: FormGroup;

  /**
   * Event emitter that triggers when a board is added
   * @event
   */
  @Output('boardAdded') boardAdded = new EventEmitter<void>();

  /**
   * Flag indicating if the form is currently submitting
   */
  isSubmitting = false;

  /**
   * ViewChild reference to the name input element
   */
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  /**
   * Constructor that initializes the component with required services
   * @param fb - Form builder service for creating reactive forms
   * @param trelloService - Service for Trello API interactions
   * @param toastr - Toast notification service
   */
  constructor(
    private fb: FormBuilder,
    private trelloService: TrelloService,
    private toastr: ToastrService
  ) {}

  /**
   * Lifecycle hook that initializes the form
   */
  ngOnInit() {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  /**
   * Lifecycle hook that focuses the name input after view initialization
   */
  ngAfterViewInit(): void {
    setTimeout(() => this.nameInput.nativeElement.focus(), 0);
  }

  /**
   * Handles form submission
   * Creates a new board using the Trello service
   * @description Submits the form and creates a new board if the form is valid
   */
  onSubmit() {
    if (this.boardForm.valid) {
      this.isSubmitting = true;
      const name = this.boardForm.get('name')?.value.trim();
      this.trelloService.addNewBoard(name).subscribe({
        /**
         * Handles successful board creation
         * @param board - Newly created board
         */
        next: (board) => {
          this.boardAdded.emit();
          this.boardForm.reset();
          this.isSubmitting = false;
          this.toastr.success('Board created successfully');
        },
        /**
         * Handles board creation error
         */
        error: () => {
          this.isSubmitting = false;
          this.toastr.error('Error while creating board');
        },
      });
    } else {
      this.boardForm.markAllAsTouched();
    }
  }
}
