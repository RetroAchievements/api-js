interface AchievementsEarnedBetweenResponseEntity {
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
}

export type GetAchievementsEarnedBetweenResponse =
  AchievementsEarnedBetweenResponseEntity[];
