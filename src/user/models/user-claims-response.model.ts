interface UserClaimsResponseEntity {
  ID: string;
  User: string;
  GameID: string;
  GameTitle: string;
  GameIcon: string;
  ConsoleName: string;
  ClaimType: string;
  SetType: string;
  Status: string;
  Extension: string;
  Special: string;
  Created: string;
  DoneTime: string;
  Updated: string;
  MinutesLeft: string;
}

export type GetUserClaimsResponse = UserClaimsResponseEntity[];
