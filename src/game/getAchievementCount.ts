import { apiBaseUrl, buildRequestUrl, call } from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetAchievementCountResponse } from "./models";

/**
 * A call to this function will retrieve the list of
 * achievement IDs for a game.
 *
 * @param authorization An object containing your userName and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param gameID The unique game ID. If you are unsure, open the game's
 * page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @example
 * ```
 * const achievementCount = await getAchievementCount(
 *   authorization,
 *   14402
 * );
 * ```
 *
 * @returns An object containing a gameID and a list of
 * achievementIDs.
 * ```
 * { gameID: 14402, achievementIDs: [1,2,3,4,5] }
 * ```
 */
export const getAchievementCount = async (
  authorization: AuthObject,
  gameID: number
) => {
  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetAchievementCount.php",
    authorization,
    { i: gameID }
  );

  return await call<GetAchievementCountResponse>({ url });
};
