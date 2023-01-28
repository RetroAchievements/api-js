export interface UserCompletedGame {
  gameId: number;
  title: string;
  imageIcon: string;
  consoleId: number;
  consoleName: string;
  maxPossible: number;
  numAwarded: number;
  pctWon: number;
  hardcoreMode: boolean;
}

export type UserCompletedGames = UserCompletedGame[];
