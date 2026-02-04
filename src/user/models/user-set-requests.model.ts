export interface UserSetRequests {
  requestedSets: Array<{
    gameId: number;
    title: string;
    consoleId: number;
    consoleName: string;
    imageIcon: string;
  }>;
  totalRequests: number;
  pointsForNext: number;
}
