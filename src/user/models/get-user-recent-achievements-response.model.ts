import type { AchievementType } from "../../achievement";

interface GetUserRecentAchievementsEntity {
  Date: string;
  HardcoreMode: 0 | 1;
  AchievementID: number;
  Title: string;
  Description: string;
  BadgeName: string;
  Points: number;
  TrueRatio: number;
  Type: AchievementType;
  Author: string;
  AuthorULID: string;
  GameTitle: string;
  GameIcon: string;
  GameID: number;
  ConsoleName: string;
  BadgeURL: string;
  GameURL: string;
}

export type GetUserRecentAchievementsResponse =
  GetUserRecentAchievementsEntity[];
