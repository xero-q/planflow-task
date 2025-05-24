import { Component, Input, signal, WritableSignal } from '@angular/core';
import TrelloBoard from '../../../shared/interfaces/trello-board';
import { TrelloService } from '../../services/trello.service';
import { ActivatedRoute } from '@angular/router';
import TrelloList from '../../../shared/interfaces/trello-list';
import { map } from 'rxjs';
import { TrelloListComponent } from '../trello-list/trello-list.component';

@Component({
  selector: 'app-trello-board',
  imports: [TrelloListComponent],
  templateUrl: './trello-board.component.html',
  styleUrl: './trello-board.component.scss',
})
export class TrelloBoardComponent {
  @Input('board') board: TrelloBoard | null = null;
  boardId: string | null = null;
  isLoading = this.board == null;

  tasksLists: WritableSignal<TrelloList[]> = signal([]);

  constructor(
    private trelloService: TrelloService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.boardId = params.get('id');

      if (this.boardId) {
        this.trelloService
          .getLists(this.boardId)
          .pipe(
            map((lists: TrelloList[]) => lists.filter((list) => !list.closed))
          )
          .subscribe((lists: TrelloList[]) => {
            this.tasksLists.set(lists);
            this.isLoading = false;
          });
      }
    });
  }
}
