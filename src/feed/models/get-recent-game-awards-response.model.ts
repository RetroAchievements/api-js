import type { AwardKind } from "../../utils/public";

export interface GetRecentGameAwardsResponse {
  Count: number;
  Total: number;
  Results: Array<{
    User: string;
    AwardKind: AwardKind;
    AwardDate: string;
    GameID: number;
    GameTitle: string;
    ConsoleID: number;
    ConsoleName: string;
  }>;
}
