export interface GetUserWantToPlayListResponse {
  Count: number;
  Total: number;
  Results: Array<{
    ID: number;
    Title: string;
    ImageIcon: string;
    ConsoleID: number;
    ConsoleName: string;
    PointsTotal: number;
    AchievementsPublished: number;
  }>;
}
