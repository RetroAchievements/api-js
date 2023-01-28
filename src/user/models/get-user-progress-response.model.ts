interface UserProgressResponseEntity {
  NumPossibleAchievements: string;
  PossibleScore: string;
  NumAchieved: number | string;
  ScoreAchieved: number | string;
  NumAchievedHardcore: number | string;
  ScoreAchievedHardcore: number | string;
}

export type GetUserProgressResponse = Record<
  `${number}`,
  UserProgressResponseEntity
>;
