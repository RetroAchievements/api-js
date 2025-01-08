interface GameHash {
  md5: string;
  name: string;
  labels: string[];
  patchUrl: string;
}

export interface GameHashes {
  results: GameHash[];
}
