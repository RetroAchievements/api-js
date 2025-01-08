interface GameHashResult {
  MD5: string;
  Name: string;
  Labels: string[];
  PatchUrl: string;
}

export interface GetGameHashesResponse {
  Results: GameHashResult[];
}
