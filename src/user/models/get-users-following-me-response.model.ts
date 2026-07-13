export interface GetUsersFollowingMeResponse {
  Count: number;
  Total: number;
  Results: Array<{
    User: string;
    ULID: string;
    Points: number;
    PointsSoftcore: number;
    AmIFollowing: boolean;
  }>;
}
