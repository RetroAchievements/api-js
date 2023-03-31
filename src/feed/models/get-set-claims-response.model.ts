interface SetClaimResponseEntity {
  ID: number;
  User: string;
  GameID: number;
  GameTitle: string;
  GameIcon: string;
  ConsoleName: string;
  ConsoleID: number;
  ClaimType: number;
  SetType: number;
  Status: number;
  Extension: number;
  Special: number;
  Created: string;
  DoneTime: string;
  Updated: string;
  MinutesLeft: number;
  UserIsJrDev: 0 | 1;
}

export type GetSetClaimsResponse = SetClaimResponseEntity[];
