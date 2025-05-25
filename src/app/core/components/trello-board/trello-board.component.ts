import { Component, Input, signal, WritableSignal } from '@angular/core';
import { TrelloService } from '../../services/trello.service';
import { ActivatedRoute, Router } from '@angular/router';
import TrelloList from '../../../shared/interfaces/trello-list';
import { map } from 'rxjs';
import { TrelloListComponent } from '../trello-list/trello-list.component';
import { LoaderComponent } from '../loader/loader.component';
import { StateService } from '../../services/state.service';
import { ToastrService } from 'ngx-toastr';
import { MetricsService } from '../../services/metrics.service';
import { ListMetrics } from '../../../shared/interfaces/metrics';
import { GeminiService } from '../../services/gemini.service';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-trello-board',
  imports: [TrelloListComponent, LoaderComponent, ModalComponent, NgIf],
  templateUrl: './trello-board.component.html',
  styleUrl: './trello-board.component.scss',
})
export class TrelloBoardComponent {
  boardId: string | null = null;
  isLoading = true;
  boardRecommnedation: string | null = null;
  displayGeminiResponse = false;

  tasksLists: WritableSignal<TrelloList[]> = signal([]);

  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private toastr: ToastrService,
    public metricsService: MetricsService,
    private geminiService: GeminiService,
    private authService: AuthService
  ) {}

  getBoardMetrics(): ListMetrics[] {
    const boardMetrics = this.metricsService.getBoardMetrics(
      this.boardId ?? ''
    );
    return boardMetrics;
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
    this.geminiService.sendPrompt(prompt).subscribe({
      next: (response: any) => {
        this.boardRecommnedation = response.candidates[0].content.parts[0].text;
        this.openModal();
      },
      error: () => {
        this.toastr.warning('Error when querying Gemini API', 'Warning');
      },
    });
  }

  doAskBoardRecommendation() {
    const boardMetrics = this.metricsService.getBoardMetrics(
      this.boardId ?? ''
    );
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
