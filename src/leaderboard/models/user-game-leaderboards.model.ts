export interface UserGameLeaderboards {
  count: number;
  total: number;
  results: Array<{
    id: number;
    rankAsc: boolean;
    title: string;
    description: string;
    format: string;
    userEntry: {
      user: string;
      ulid: string;
      score: number;
      formattedScore: string;
      rank: number;
      dateUpdated: string;
    };
  }>;
}
