// NOTE: This cannot be a true extension of the `GetGameResponse`
// interface because the return types for many of these fields
// are different from the actual RA API.

enum GameExtendedClaimType {
  Primary = "0",
  Collaboration = "1",
}

export interface GameExtendedRawAchievementEntity {
  ID: string;
  NumAwarded: string;
  NumAwardedHardcore: string;
  Title: string;
  Description: string;
  Points: string;
  TrueRatio: string;
  Author: string;
  DateModified: string;
  DateCreated: string;
  BadgeName: string;
  DisplayOrder: string;
  MemAddr: string;
}

interface GameExtendedRawClaimEntity {
  User: string;
  SetType: string;
  ClaimType: GameExtendedClaimType;
  Created: string;
  Expiration: string;
}

export interface GetGameExtendedResponse {
  ID: number;
  Title: string;
  ConsoleID: number;
  ForumTopicID: number;
  Flags: number;
  ImageIcon: string;
  ImageTitle: string;
  ImageIngame: string;
  ImageBoxArt: string;
  Publisher: string;
  Developer: string;
  Genre: string;
  Released: string;
  IsFinal: boolean;
  ConsoleName: string;
  RichPresencePatch: string;
  NumAchievements: number;
  NumDistinctPlayersCasual: string;
  NumDistinctPlayersHardcore: string;
  Claims: GameExtendedRawClaimEntity[];
  Achievements: Record<number, GameExtendedRawAchievementEntity> | [];
}
