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
  highestAwardKind?:
    | "mastered"
    | "completed"
    | "beaten-hardcore"
    | "beaten-softcore"
    | null;
  highestAwardDate?: string;
}
