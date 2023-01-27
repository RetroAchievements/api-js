interface UserRecentlyPlayedGameEntity {
  gameId: number;
  consoleId: number;
  consoleName: string;
  title: string;
  imageIcon: string;
  lastPlayed: string;
  numPossibleAchievements: number;
  possibleScore: number;
  numAchieved: number;
  scoreAchieved: number;
  numAchievedHardcore: number;
  scoreAchievedHardcore: number;
}

export type UserRecentlyPlayedGames = UserRecentlyPlayedGameEntity[];
