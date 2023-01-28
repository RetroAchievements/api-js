export interface UserGameRankAndScoreEntity {
  user: string;
  totalScore: number;
  lastAward: string;
  userRank: number;
}

export type UserGameRankAndScore = UserGameRankAndScoreEntity[];
