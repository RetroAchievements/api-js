interface UserClaim {
  id: number;
  user: string;
  gameId: number;
  gameTitle: string;
  gameIcon: string;
  consoleName: string;
  claimType: number;
  setType: number;
  status: number;
  extension: number;
  special: number;
  created: string;
  doneTime: string;
  updated: string;
  minutesLeft: number;
}

export type UserClaims = UserClaim[];
