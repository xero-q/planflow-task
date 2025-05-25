import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrelloService } from '../../services/trello.service';

@Component({
  selector: 'app-form-card',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent {
  cardForm!: FormGroup;
  @Input('idList') idList!: string;
  @Output('cardAdded') cardAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private trelloService: TrelloService) {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.cardForm.valid) {
      const name = this.cardForm.get('name')?.value.trim();
      this.trelloService.addNewCard(name, this.idList).subscribe({
        next: () => {
          this.cardAdded.emit();
          this.cardForm.reset();
        },
        error: (err) => {
          //TODO: Add error handling;
          console.error(err);
        },
      });
    }
  }
}
