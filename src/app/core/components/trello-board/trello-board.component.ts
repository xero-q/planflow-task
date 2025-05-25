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
import { BoardMetrics, ListMetrics } from '../../../shared/interfaces/metrics';

@Component({
  selector: 'app-trello-board',
  imports: [TrelloListComponent, LoaderComponent],
  templateUrl: './trello-board.component.html',
  styleUrl: './trello-board.component.scss',
})
export class TrelloBoardComponent {
  boardId: string | null = null;
  isLoading = true;

  tasksLists: WritableSignal<TrelloList[]> = signal([]);

  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private toastr: ToastrService,
    public metricsService: MetricsService
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
}
