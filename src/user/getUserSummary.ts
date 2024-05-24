import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetUserSummaryResponse, UserSummary } from "./models";

/**
 * A call to this function will retrieve summary information about
 * a given user, targeted by username.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the summary for.
 *
 * @param payload.recentGamesCount Optional. The number of recent games to return.
 * This defaults to 0.
 *
 * @param payload.recentAchievementsCount Optional. The number of recent achievements
 * to return. This defaults to 5.
 *
 * @example
 * ```
 * const userSummary = await getUserSummary(
 *   authorization,
 *   { username: "xelnia" }
 * );
 * ```
 *
 * @returns An object containing summary metadata about a target user.
 */
export const getUserSummary = async (
  authorization: AuthObject,
  payload: {
    username: string;
    recentGamesCount?: number;
    recentAchievementsCount?: number;
  }
): Promise<UserSummary> => {
  const { username, recentGamesCount, recentAchievementsCount } = payload;

  const queryParams: Record<string, string | number> = { u: username };

  if (recentGamesCount !== undefined) {
    queryParams["g"] = recentGamesCount;
  }

  if (recentAchievementsCount !== undefined) {
    queryParams["a"] = recentAchievementsCount;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserSummary.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetUserSummaryResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "GameID",
      "ConsoleID",
      "ID",
      "LastGameID",
      "ForumTopicID",
      "activitytype",
      "ContribCount",
      "ContribYield",
      "TotalPoints",
      "TotalSoftcorePoints",
      "TotalTruePoints",
      "Permissions",
      "NumPossibleAchievements",
      "PossibleScore",
      "NumAchieved",
      "ScoreAchieved",
      "NumAchievedHardcore",
      "ScoreAchievedHardcore",
      "Points",
      "SoftcorePoints",
    ],
    shouldMapToBooleans: [
      "Untracked",
      "UserWallActive",
      "IsAwarded",
      "HardcoreAchieved",
    ],
  });
};
