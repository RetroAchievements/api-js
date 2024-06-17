export interface AchievementUnlockEntity {
  user: string;
  raPoints: number;
  raSoftcorePoints: number;
  dateAwarded: string;
  hardcoreMode: boolean;
}

export interface AchievementUnlocksMetadata {
  achievement: {
    id: number;
    title: string;
    description: string;
    points: number;
    trueRatio: number;
    author: string;
    dateCreated: string;
    dateModified: string;
  };

  console: { id: number; title: string };
  game: { id: number; title: string };
  unlocksCount: number;
  totalPlayers: number;
  unlocks: AchievementUnlockEntity[];
}
