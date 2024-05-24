import type { AwardKind } from "../../utils/public";

export interface UserCompletionProgressEntity {
  gameId: number;
  title: string;
  imageIcon: string;
  consoleId: number;
  consoleName: string;
  maxPossible: number;
  numAwarded: number;
  numAwardedHardcore: number;

  mostRecentAwardedDate?: string;
  highestAwardKind?: AwardKind | null;
  highestAwardDate?: string;
}
