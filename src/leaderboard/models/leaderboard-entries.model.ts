export interface LeaderboardEntries {
  count: number;
  total: number;
  results: Array<{
    rank: number;
    user: string;
    ulid: string;
    score: number;
    formattedScore: string;
    dateSubmitted: string;
  }>;
}
