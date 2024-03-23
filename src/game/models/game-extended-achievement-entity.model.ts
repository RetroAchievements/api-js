import type { AchievementType } from "../../achievement";

export interface GameExtendedAchievementEntity {
  id: number;
  numAwarded: number;
  numAwardedHardcore: number;
  title: string;
  description: string;
  points: number;
  trueRatio: number;
  author: string;
  dateModified: string;
  dateCreated: string;
  badgeName: string;
  displayOrder: number;
  memAddr: string;
  type: AchievementType;
}
