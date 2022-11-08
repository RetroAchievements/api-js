interface GameEntity {
  title: string;
  id: number;
  consoleId: number;
  consoleName: string;
  imageIcon: string;
  numAchievements: number;
  numLeaderboards: number;
  points: number;
  dateModified: string;
  forumTopicId: number;

  hashes?: string[];
}

export type GameList = GameEntity[];
