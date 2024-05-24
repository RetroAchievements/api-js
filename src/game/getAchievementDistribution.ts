import type { ID } from "../utils/internal";
import { apiBaseUrl, buildRequestUrl, call } from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  AchievementDistributionFlags,
  GetAchievementDistributionResponse,
} from "./models";

/**
 * A call to this function will retrieve a dictionary
 * of the number of players who have earned a specific
 * number of achievements for a given game ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @param payload.flags Optional. By default, only official achievement
 * tallies are returned in the response. Import the `AchievementDistributionFlags`
 * enum for possible values. This lets you see the count of players who have
 * unlocked unofficial achievements.
 *
 * @param payload.hardcore Optional. By default, set to false, with both
 * softcore and hardcore tallies returned in the response. If this option
 * is set to true, only hardcore unlocks will be included in the totals.
 *
 * @example
 * ```
 * const achievementDistribution = await getAchievementDistribution(
 *   authorization,
 *   { gameId: 14402, hardcore: true }
 * );
 * ```
 *
 * @returns A dictionary where the keys represent the earned achievement
 * count and the values represent the number of players who have unlocked
 * that many achievements.
 * ```
 * {
 *   '1': 64,
 *   '2': 19,
 *   '3': 11,
 *   '4': 18,
 *   '5': 25,
 *   '6': 20,
 *   '7': 26,
 *   '8': 29,
 *   '9': 54,
 *   '10': 17,
 *   '11': 29,
 *   '12': 4
 * }
 * ```
 */
export const getAchievementDistribution = async (
  authorization: AuthObject,
  payload: {
    gameId: ID;
    flags?: AchievementDistributionFlags;
    hardcore?: boolean;
  }
) => {
  const { gameId, flags, hardcore } = payload;

  const queryParams: Record<string, any> = { i: gameId };

  if (flags !== undefined) {
    queryParams["f"] = flags;
  }

  if (hardcore !== undefined) {
    queryParams["h"] = hardcore === true ? 1 : 0;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetAchievementDistribution.php",
    authorization,
    queryParams
  );

  return await call<GetAchievementDistributionResponse>({
    url,
  });
};
