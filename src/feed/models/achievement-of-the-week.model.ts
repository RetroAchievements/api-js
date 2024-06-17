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
    badgeName: string;
    badgeUrl: string;
  };

  console: { id: number; title: string };
  forumTopic: { id: number };
  game: { id: number; title: string };
  startAt: string;
  totalPlayers: number;

  unlocks: Array<{
    user: string;
    raPoints: number;
    raSoftcorePoints: number;
    dateAwarded: string;
    hardcoreMode: boolean;
  }>;

  unlocksCount: number;
}
