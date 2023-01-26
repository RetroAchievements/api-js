export interface GetGameRatingResponse {
  GameID: number;
  Ratings: {
    Game: number;
    Achievements: number;
    GameNumVotes: number;
    AchievementsNumVotes: number;
  };
}
