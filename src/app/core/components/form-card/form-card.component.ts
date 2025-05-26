import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
import TrelloCard from '../../../shared/interfaces/trello-card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-card',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent {
  cardForm!: FormGroup;
  @Input('idList') idList!: string;
  @Input('card') card: TrelloCard | null = null;
  @Output('cardAddedUpdated') cardAddedUpdated = new EventEmitter<void>();
  isSubmitting = false;

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private trelloService: TrelloService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cardForm = !this.card
      ? this.fb.group({
          name: ['', Validators.required],
          desc: [''],
        })
      : this.fb.group({
          name: [this.card?.name, Validators.required],
          desc: [this.card?.desc],
        });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.nameInput.nativeElement.focus(), 0);
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.isSubmitting = true;
      if (!this.card) {
        //Adding
        const name = this.cardForm.get('name')?.value.trim();
        const description = this.cardForm.get('desc')?.value.trim();
        this.trelloService
          .addNewCard(name, description, this.idList)
          .subscribe({
            next: () => {
              this.cardAddedUpdated.emit();
              this.cardForm.reset();
              this.isSubmitting = false;
            },
            error: () => {
              this.toastr.error('Error while creating card', 'Error');
              this.isSubmitting = false;
            },
          });
      } else {
        //Updating
        const name = this.cardForm.get('name')?.value.trim();
        const description = this.cardForm.get('desc')?.value.trim();
        this.trelloService
          .updateCard(this.card?.id, name, description)
          .subscribe({
            next: () => {
              this.cardAddedUpdated.emit();
              this.cardForm.reset();
              this.isSubmitting = false;
            },
            error: () => {
              this.toastr.error('Error while updating card', 'Error');
              this.isSubmitting = false;
            },
          });
      }
    } else {
      this.cardForm.markAllAsTouched();
    }
  }
}
