interface RecentlyPlayedGameEntity {
  GameID: string;
  ConsoleID: string;
  ConsoleName: string;
  Title: string;
  ImageIcon: string;
  LastPlayed: string;
}

interface RecentlyAwardedAchievementEntity {
  NumPossibleAchievements: string;
  PossibleScore: string;
  NumAchieved: number | string;
  ScoreAchieved: number | string;
  NumAchievedHardcore: number | string;
  ScoreAchievedHardcore: number | string;
}

interface ExtendedRecentAchievementEntity {
  ID: string;
  GameID: string;
  GameTitle: string;
  Title: string;
  Description: string;
  Points: string;
  BadgeName: string;
  IsAwarded: "1";
  DateAwarded: string;
  HardcoreAchieved: "0";
}

interface LastGameEntity {
  ID: number;
  Title: string;
  ConsoleID: number;
  ForumTopicID: number;
  Flags: number;
  ImageIcon: string;
  ImageTitle: string;
  ImageIngame: string;
  ImageBoxArt: string;
  Publisher: string;
  Developer: string;
  Genre: string;
  Released: string;
  IsFinal: boolean;
  ConsoleName: string;
  RichPresencePatch: string;
}

export interface GetUserSummaryResponse {
  RecentlyPlayedCount: number;
  RecentlyPlayed: RecentlyPlayedGameEntity[];
  MemberSince: string;

  LastActivity: {
    ID: string;
    timestamp: string;
    lastupdate: string;
    activitytype: string;
    User: string;
    data: string;
    data2: string;
  };

  RichPresenceMsg: string;
  LastGameID: string;
  LastGame: LastGameEntity;
  ContribCount: string;
  ContribYield: string;
  TotalPoints: string;
  TotalSoftcorePoints: string;
  TotalTruePoints: string;
  Permissions: string;
  Untracked: "0" | "1";
  ID: string;
  UserWallActive: "0" | "1";
  Motto: string;
  Rank: number;
  Awarded: Record<`${number}`, RecentlyAwardedAchievementEntity>;

  RecentAchievements: Record<
    `${number}`,
    Record<`${number}`, ExtendedRecentAchievementEntity>
  >;

  Points: string;
  SoftcorePoints: string;
  UserPic: string;
  TotalRanked: number;
  Status: string;
}
