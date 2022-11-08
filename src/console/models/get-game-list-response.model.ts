interface RawGameListEntity {
  Title: string;
  ID: string;
  ConsoleID: string;
  ConsoleName: string;
  ImageIcon: string;
  NumAchievements: number;
  NumLeaderboards: number;
  Points: number;
  DateModified: string;
  ForumTopicID: number;

  Hashes?: string[];
}

export type GetGameListResponse = RawGameListEntity[];
