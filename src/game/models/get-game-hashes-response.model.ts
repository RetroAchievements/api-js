interface GameHashResult {
  MD5: string;
  Name: string;
  Labels: string[];
  PatchUrl: string | null;
}

export interface GetGameHashesResponse {
  Results: GameHashResult[];
}
