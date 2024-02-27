interface DatedUserAchievementResponseEntity {
  Date: string;
  HardcoreMode: string;
  AchievementID: string;
  Title: string;
  Description: string;
  BadgeName: string;
  Points: string;
  Author: string;
  GameTitle: string;
  GameIcon: string;
  GameID: string;
  ConsoleName: string;
  CumulScore: number;
  BadgeURL: string;
  GameURL: string;
  Type: "progression" | "win_condition" | "missable" | null;
}

export type DatedUserAchievementsResponse =
  DatedUserAchievementResponseEntity[];
