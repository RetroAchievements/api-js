interface UserRecentlyPlayedGameResponseEntity {
  GameID: string;
  ConsoleID: string;
  ConsoleName: string;
  Title: string;
  ImageIcon: string;
  LastPlayed: string;
  MyVote: "1" | "2" | "3" | "4" | "5" | null;
  NumPossibleAchievements: string;
  PossibleScore: string;
  NumAchieved: string | number;
  ScoreAchieved: string | number;
  NumAchievedHardcore: string | number;
  ScoreAchievedHardcore: string | number;
}

export type GetUserRecentlyPlayedGamesResponse =
  UserRecentlyPlayedGameResponseEntity[];
