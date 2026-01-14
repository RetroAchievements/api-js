export interface GameLeaderboards {
  count: number;
  total: number;
  results: Array<{
    id: number;
    rankAsc: boolean;
    title: string;
    description: string;
    format: string;
    author: string;
    authorUlid: string;
    state: "active" | "disabled" | "unpublished";
    topEntry: {
      user: string;
      ulid: string;
      score: number;
      formattedScore: string;
    };
  }>;
}
