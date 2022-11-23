interface RawGameRankAndScoreEntity {
  User: string;
  TotalScore: string;
  LastAward: string;
  Rank: number;
}

export type GetGameRankAndScoreResponse = RawGameRankAndScoreEntity[];
