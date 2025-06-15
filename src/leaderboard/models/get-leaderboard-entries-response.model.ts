export interface GetLeaderboardEntriesResponse {
  Count: number;
  Total: number;
  Results: Array<{
    Rank: number;
    User: string;
    ULID: string;
    Score: number;
    FormattedScore: string;
    DateSubmitted: string;
  }>;
}
