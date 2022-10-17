export interface AchievementOfTheWeek {
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
  forumTopic: { id: number };
  game: { id: number; title: string };
  startAt: string;
  totalPlayers: number;

  unlocks: Array<{
    user: string;
    raPoints: number;
    dateAwarded: string;
    hardcoreMode: boolean;
  }>;

  unlocksCount: number;
}
