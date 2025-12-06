export interface GetUsersIFollowResponse {
  Count: number;
  Total: number;
  Results: Array<{
    User: string;
    ULID: string;
    Points: number;
    PointsSoftcore: number;
    IsFollowingMe: boolean;
  }>;
}
