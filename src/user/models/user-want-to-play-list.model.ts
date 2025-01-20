export interface UserWantToPlayList {
  count: number;
  total: number;
  results: Array<{
    id: number;
    title: string;
    imageIcon: string;
    consoleId: number;
    consoleName: string;
    pointsTotal: number;
    achievementsPublished: number;
  }>;
}
