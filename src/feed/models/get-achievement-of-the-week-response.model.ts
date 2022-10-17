export interface GetAchievementOfTheWeekResponse {
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
  ForumTopic: { ID: string };
  Game: { ID: string; Title: string };
  StartAt: string;
  TotalPlayers: string;

  Unlocks: Array<{
    User: string;
    RAPoints: string;
    DateAwarded: string;
    HardcoreMode: string;
  }>;

  UnlocksCount: string;
}
