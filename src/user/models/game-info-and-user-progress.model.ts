import type {
  GameExtended,
  GameExtendedAchievementEntity,
} from "../../game/models";

export type GameExtendedAchievementEntityWithUserProgress =
  GameExtendedAchievementEntity & {
    dateEarned: string;
    dateEarnedHardcore: string;
  };

export interface GameInfoAndUserProgress extends GameExtended {
  achievements: Record<number, GameExtendedAchievementEntityWithUserProgress>;

  numAwardedToUser: number;
  numAwardedToUserHardcore: number;
  userCompletion: string;
  userCompletionHardcore: string;

  highestAwardKind?:
    | "mastered"
    | "completed"
    | "beaten-hardcore"
    | "beaten-softcore"
    | null;
  highestAwardDate?: string;
}
