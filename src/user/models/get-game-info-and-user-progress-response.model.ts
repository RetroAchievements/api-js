import type {
  GameExtendedRawAchievementEntity,
  GetGameExtendedResponse
} from "../../game/models";

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
}
