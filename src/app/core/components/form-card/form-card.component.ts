import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private trelloService: TrelloService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cardForm = !this.card
      ? this.fb.group({
          name: ['', Validators.required],
        })
      : this.fb.group({
          name: [this.card?.name, Validators.required],
          desc: [this.card?.desc],
        });
  }

  onSubmit() {
    if (this.cardForm.valid) {
      if (!this.card) {
        //Adding
        const name = this.cardForm.get('name')?.value.trim();
        this.trelloService.addNewCard(name, this.idList).subscribe({
          next: () => {
            this.cardAddedUpdated.emit();
            this.cardForm.reset();
          },
          error: () => {
            this.toastr.error('Error while creating card', 'Error');
          },
        });
      } else {
        const name = this.cardForm.get('name')?.value.trim();
        const desc = this.cardForm.get('desc')?.value.trim();
        this.trelloService.updateCard(this.card?.id, name, desc).subscribe({
          next: () => {
            this.cardAddedUpdated.emit();
            this.cardForm.reset();
          },
          error: () => {
            this.toastr.error('Error while updating card', 'Error');
          },
        });
      }
    } else {
      this.cardForm.markAllAsTouched();
    }
  }
}
