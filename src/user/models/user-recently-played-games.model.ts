export interface UserRecentlyPlayedGameEntity {
  gameId: number;
  consoleId: number;
  consoleName: string;
  title: string;
  imageIcon: string;
  lastPlayed: string;
  myVote: 1 | 2 | 3 | 4 | 5 | null;
  numPossibleAchievements: number;
  possibleScore: number;
  numAchieved: number;
  scoreAchieved: number;
  numAchievedHardcore: number;
  scoreAchievedHardcore: number;
}

export type UserRecentlyPlayedGames = UserRecentlyPlayedGameEntity[];
