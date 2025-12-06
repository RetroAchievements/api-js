export interface UsersIFollow {
  count: number;
  total: number;
  results: Array<{
    user: string;
    ulid: string;
    points: number;
    pointsSoftcore: number;
    isFollowingMe: boolean;
  }>;
}
