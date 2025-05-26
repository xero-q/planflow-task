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

@Component({
  selector: 'app-form-board',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-board.component.html',
  styleUrl: './form-board.component.scss',
})
export class FormBoardComponent {
  boardForm!: FormGroup;
  @Output('boardAdded') boardAdded = new EventEmitter<void>();
  isSubmitting = false;

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

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

  ngAfterViewInit(): void {
    setTimeout(() => this.nameInput.nativeElement.focus(), 0);
  }

  onSubmit() {
    if (this.boardForm.valid) {
      this.isSubmitting = true;
      const name = this.boardForm.get('name')?.value.trim();
      this.trelloService.addNewBoard(name).subscribe({
        next: () => {
          this.boardAdded.emit();
          this.boardForm.reset();
          this.isSubmitting = false;
        },
        error: () => {
          this.toastr.error('Error while creating board', 'Error');
          this.isSubmitting = false;
        },
      });
    } else {
      this.boardForm.markAllAsTouched();
    }
  }
}
