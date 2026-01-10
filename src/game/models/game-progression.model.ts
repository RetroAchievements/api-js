export interface GameProgression {
  id: number;
  title: string;
  consoleId: number;
  consoleName: string;
  imageIcon: string;
  numDistinctPlayers: number;
  timesUsedInBeatMedian: number;
  timesUsedInHardcoreBeatMedian: number;
  medianTimeToBeat: number | null;
  medianTimeToBeatHardcore: number | null;
  timesUsedInCompletionMedian: number;
  timesUsedInMasteryMedian: number;
  medianTimeToComplete: number | null;
  medianTimeToMaster: number | null;
  numAchievements: number;
  achievements: Array<{
    id: number;
    title: string;
    description: string;
    points: number;
    trueRatio: number;
    type: string | null;
    badgeName: string;
    numAwarded: number;
    numAwardedHardcore: number;
    timesUsedInUnlockMedian: number;
    timesUsedInHardcoreUnlockMedian: number;
    medianTimeToUnlock: number;
    medianTimeToUnlockHardcore: number;
  }>;
}
