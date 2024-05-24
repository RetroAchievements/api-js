import type {
  GameExtendedRawAchievementEntity,
  GetGameExtendedResponse,
} from "../../game/models";
import type { AwardKind } from "../../utils/public";

type GetGameExtendedResponseWithoutClaims = Omit<
  GetGameExtendedResponse,
  "Claims"
>;

type GameExtendedRawAchievementEntityWithUserProgress =
  GameExtendedRawAchievementEntity & {
    DateEarned: string;
    DateEarnedHardcore: string;
  };

export interface GetGameInfoAndUserProgressResponse
  extends GetGameExtendedResponseWithoutClaims {
  Achievements: Record<
    number,
    GameExtendedRawAchievementEntityWithUserProgress
  >;

  NumAwardedToUser: number;
  NumAwardedToUserHardcore: number;
  UserCompletion: string;
  UserCompletionHardcore: string;

  HighestAwardKind?: AwardKind | null;
  HighestAwardDate?: string;
}
