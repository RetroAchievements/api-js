import type { AwardKind } from "../../utils/public";

export interface RecentGameAwards {
  count: number;
  total: number;
  results: Array<{
    user: string;
    awardKind: AwardKind;
    awardDate: string;
    gameId: number;
    gameTitle: string;
    consoleId: number;
    consoleName: string;
  }>;
}
