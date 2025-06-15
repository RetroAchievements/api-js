export interface GetUserGameLeaderboardsResponse {
  Count: number;
  Total: number;
  Results: Array<{
    ID: number;
    RankAsc: boolean;
    Title: string;
    Description: string;
    Format: string;
    UserEntry: {
      User: string;
      ULID: string;
      Score: number;
      FormattedScore: string;
      Rank: number;
      DateUpdated: string;
    };
  }>;
}
