import type { AchievementType } from "../../achievement";

export interface UserRecentAchievement {
  date: string;
  hardcoreMode: boolean;
  achievementId: number;
  title: string;
  description: string;
  badgeName: string;
  points: number;
  trueRatio: number;
  type: AchievementType;
  author: string;
  authorUlid: string;
  gameTitle: string;
  gameIcon: string;
  gameId: number;
  consoleName: string;
  badgeUrl: string;
  gameUrl: string;
}
