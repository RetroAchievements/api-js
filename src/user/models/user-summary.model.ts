export interface RecentlyPlayedGameEntity {
  gameId: number;
  consoleId: number;
  consoleName: string;
  title: string;
  imageIcon: string;
  lastPlayed: string;
}

export interface LastActivityEntity {
  id: number;
  timestamp: string;
  lastupdate: string;
  activitytype: number;
  user: string;
  data: string;
  data2: string;
}

export interface LastGameEntity {
  id: number;
  title: string;
  consoleId: number;
  forumTopicId: number;
  flags: number;
  imageIcon: string;
  imageTitle: string;
  imageIngame: string;
  imageBoxArt: string;
  publisher: string;
  developer: string;
  genre: string;
  released: string;
  isFinal: boolean;
  consoleName: string;
  richPresencePatch: string;
}

export interface AwardedGameEntity {
  numPossibleAchievements: number;
  possibleScore: number;
  numAchieved: number;
  scoreAchieved: number;
  numAchievedHardcore: number;
  scoreAchievedHardcore: number;
}

export interface ExtendedRecentAchievementEntity {
  id: number;
  gameId: number;
  gameTitle: string;
  title: string;
  description: string;
  points: number;
  badgeName: string;
  isAwarded: true;
  dateAwarded: string;
  hardcoreAchieved: false;
}

export interface UserSummary {
  recentlyPlayedCount: number;
  recentlyPlayed: RecentlyPlayedGameEntity[];
  memberSince: string;
  lastActivity: LastActivityEntity;
  richPresenceMsg: string;
  lastGameId: number;
  lastGame: LastGameEntity;
  contribCount: number;
  contribYield: number;
  totalPoints: number;
  totalSoftcorePoints: number;
  totalTruePoints: number;
  permissions: number;
  untracked: boolean;
  id: number;
  userWallActive: boolean;
  motto: string;
  rank: number;
  awarded: Record<`${number}`, AwardedGameEntity>;

  recentAchievements: Record<
    `${number}`,
    Record<`${number}`, ExtendedRecentAchievementEntity>
  >;

  points: number;
  softcorePoints: number;
  userPic: string;
  totalRanked: number;
  status: string;
}
