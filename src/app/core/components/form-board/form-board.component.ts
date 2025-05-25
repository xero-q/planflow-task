import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrelloService } from '../../services/trello.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-board',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-board.component.html',
  styleUrl: './form-board.component.scss',
})
export class FormBoardComponent {
  boardForm!: FormGroup;
  @Output('boardAdded') boardAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private trelloService: TrelloService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.boardForm.valid) {
      const name = this.boardForm.get('name')?.value.trim();
      this.trelloService.addNewBoard(name).subscribe({
        next: () => {
          this.boardAdded.emit();
          this.boardForm.reset();
        },
        error: () => {
          this.toastr.error('Error while creating board', 'Error');
        },
      });
    } else {
      this.boardForm.markAllAsTouched;
    }
  }
}
