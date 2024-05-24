import type { AwardKind } from "../../utils/public";

interface RawUserCompletionProgressEntity {
  GameID: number;
  Title: string;
  ImageIcon: string;
  ConsoleID: number;
  ConsoleName: string;
  MaxPossible: number;
  NumAwarded: number;
  NumAwardedHardcore: number;

  MostRecentAwardedDate?: string;
  HighestAwardKind?: AwardKind | null;
  HighestAwardDate?: string | null;
}

export interface GetUserCompletionProgressResponse {
  Count: number;
  Total: number;
  Results: RawUserCompletionProgressEntity[];
}
