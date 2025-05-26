import { Component, Input, signal, WritableSignal } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TrelloListComponent } from '../trello-list/trello-list.component';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../../core/components/loader/loader.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import TrelloList from '../../shared/interfaces/trello-list';
import { TrelloService } from '../../core/services/trello.service';
import { StateService } from '../../core/services/state.service';
import { GeminiService } from '../../core/services/gemini.service';
import { AuthService } from '../../core/services/auth.service';
import { ListMetrics } from '../../shared/interfaces/metrics';

@Component({
  selector: 'app-trello-board',
  imports: [
    MarkdownModule,
    TrelloListComponent,
    LoaderComponent,
    ModalComponent,
    NgIf,
  ],
  templateUrl: './trello-board.component.html',
  styleUrl: './trello-board.component.scss',
})
export class TrelloBoardComponent {
  boardId: string | null = null;
  isLoading = true;
  boardRecommnedation: string | null = null;
  displayGeminiResponse = false;

  tasksLists: WritableSignal<TrelloList[]> = signal([]);
  isPromptingAI = false;

  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private toastr: ToastrService,
    private geminiService: GeminiService,
    private authService: AuthService
  ) {}

  getBoardMetrics(): ListMetrics[] {
    return this.stateService.getBoardMetrics(this.boardId ?? '');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.boardId = params.get('id');

      if (this.boardId) {
        this.stateService.setBoardId(this.boardId);
        this.trelloService
          .getLists(this.boardId)
          .pipe(
            map((lists: TrelloList[]) => lists.filter((list) => !list.closed))
          )
          .subscribe({
            next: (lists: TrelloList[]) => {
              this.tasksLists.set(lists);
              this.isLoading = false;
            },
            error: () => {
              this.toastr.error('Error loading board', 'Error');
              this.isLoading = false;
              this.router.navigate(['/dashboard']);
            },
          });
      }
    });
  }

  getBoardRecommendation(prompt: string) {
    this.isPromptingAI = true;
    this.geminiService.sendPrompt(prompt).subscribe({
      next: (response: any) => {
        this.boardRecommnedation = response.candidates[0].content.parts[0].text;
        this.isPromptingAI = false;
        this.openModal();
      },
      error: (err: any) => {
        this.toastr.warning('Error when prompting Gemini API', 'Warning');
        console.error(err);
        this.isPromptingAI = false;
      },
    });
  }

  doAskBoardRecommendation() {
    const boardMetrics = this.stateService.getBoardMetrics(this.boardId ?? '');
    const prompt = `Here it is a JSON stringified of my lists and theirs cards of a Trello board: ${JSON.stringify(
      boardMetrics,
      null,
      2
    )}. I want you to give me some recommnedation based on that, just include in your response the text of the recommendation`;
    this.getBoardRecommendation(prompt);
  }

  openModal() {
    this.displayGeminiResponse = true;
  }

  closeModal() {
    this.displayGeminiResponse = false;
  }
}
