interface AchievementUnlocksResponseEntity {
  User: string;
  RAPoints: string;
  RASoftcorePoints: string;
  DateAwarded: string;
  HardcoreMode: string;
}

export interface GetAchievementUnlocksResponse {
  Achievement: {
    ID: string;
    Title: string;
    Description: string;
    Points: string;
    TrueRatio: string;
    Author: string;
    DateCreated: string;
    DateModified: string;
  };
  Console: { ID: string; Title: string };
  Game: { ID: string; Title: string };
  UnlocksCount: number;
  TotalPlayers: number;
  Unlocks: AchievementUnlocksResponseEntity[];
}
