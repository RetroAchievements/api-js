interface GetUserRecentAchievementsEntity {
  Date: string;
  HardcoreMode: 0 | 1;
  AchievementID: number;
  Title: string;
  Description: string;
  BadgeName: string;
  Points: number;
  Author: string;
  GameTitle: string;
  GameIcon: string;
  GameID: number;
  ConsoleName: string;
  BadgeURL: string;
  GameURL: string;
}

export type GetUserRecentAchievementsResponse =
  GetUserRecentAchievementsEntity[];
