export interface GetUserSetRequestsResponse {
  RequestedSets: Array<{
    GameID: number | string;
    Title: string;
    ConsoleID: number | string;
    ConsoleName: string;
    ImageIcon: string;
  }>;
  TotalRequests: number;
  PointsForNext: number;
}
