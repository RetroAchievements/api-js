export interface GameRating {
  gameId: number;
  ratings: {
    game: number;
    achievements: number;
    gameNumVotes: number;
    achievementsNumVotes: number;
  };
}
