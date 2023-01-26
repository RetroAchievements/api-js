interface UserGameRankAndScoreResponseEntity {
  User: string;
  TotalScore: string;
  LastAward: string;
  UserRank: string;
}

export type GetUserGameRankAndScoreResponse =
  UserGameRankAndScoreResponseEntity[];
