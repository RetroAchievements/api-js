import type { GameExtendedAchievementEntity } from "./game-extended-achievement-entity.model";
import type { GameExtendedClaimEntity } from "./game-extended-claim-entity.model";

export interface GameExtended {
  id: number;
  title: string;
  consoleId: number;
  forumTopicId: number;
  flags: number;
  imageIcon: string;
  imageTitle: string;
  imageIngame: string;
  imageBoxArt: string;
  publisher: string;
  developer: string;
  genre: string;
  released: string;
  isFinal: boolean;
  consoleName: string;
  richPresencePatch: string;
  numAchievements: number;
  numDistinctPlayersCasual: number;
  numDistinctPlayersHardcore: number;
  claims: GameExtendedClaimEntity[];
  achievements: Record<number, GameExtendedAchievementEntity>;
}
