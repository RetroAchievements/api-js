export interface UsersFollowingMe {
  count: number;
  total: number;
  results: Array<{
    user: string;
    ulid: string;
    points: number;
    pointsSoftcore: number;
    amIFollowing: boolean;
  }>;
}
