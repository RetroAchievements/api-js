import type { AchievementType } from "../../achievement";

export type DatedUserAchievement = {
  date: string;
  hardcoreMode: boolean;
  achievementId: number;
  title: string;
  description: string;
  badgeName: string;
  points: number;
  author: string;
  gameTitle: string;
  gameIcon: string;
  gameId: number;
  consoleName: string;
  cumulScore: number;
  badgeUrl: string;
  gameUrl: string;
  type: AchievementType;
};
