interface ListMetrics {
  id: string;
  name: string;
  totalCards: number;
}

interface BoardMetrics {
  id: string;
  lists: ListMetrics[];
}

interface UserMetrics {
  boards: BoardMetrics[];
}

export type { ListMetrics, BoardMetrics, UserMetrics };
