export interface GetGameLeaderboardsResponse {
  Count: number;
  Total: number;
  Results: Array<{
    ID: number;
    RankAsc: boolean;
    Title: string;
    Description: string;
    Format: string;
    Author: string;
    AuthorULID: string;
    State: "active" | "disabled" | "unpublished";
    TopEntry: {
      User: string;
      ULID: string;
      Score: number;
      FormattedScore: string;
    };
  }>;
}
