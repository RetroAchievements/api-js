interface UserCompletedGamesResponseEntity {
  GameID: string;
  Title: string;
  ImageIcon: string;
  ConsoleID: string;
  ConsoleName: string;
  MaxPossible: string;
  NumAwarded: string;
  PctWon: string;
  HardcoreMode: "0" | "1";
}

export type GetUserCompletedGamesResponse = UserCompletedGamesResponseEntity[];
