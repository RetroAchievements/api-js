export interface GetGameProgressionResponse {
  ID: number;
  Title: string;
  ConsoleID: number;
  ConsoleName: string;
  ImageIcon: string;
  NumDistinctPlayers: number;
  TimesUsedInBeatMedian: number;
  TimesUsedInHardcoreBeatMedian: number;
  MedianTimeToBeat: number | null;
  MedianTimeToBeatHardcore: number | null;
  TimesUsedInCompletionMedian: number;
  TimesUsedInMasteryMedian: number;
  MedianTimeToComplete: number | null;
  MedianTimeToMaster: number | null;
  NumAchievements: number;
  Achievements: Array<{
    ID: number;
    Title: string;
    Description: string;
    Points: number;
    TrueRatio: number;
    Type: string | null;
    BadgeName: string;
    NumAwarded: number;
    NumAwardedHardcore: number;
    TimesUsedInUnlockMedian: number;
    TimesUsedInHardcoreUnlockMedian: number;
    MedianTimeToUnlock: number;
    MedianTimeToUnlockHardcore: number;
  }>;
}
