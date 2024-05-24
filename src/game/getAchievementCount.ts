import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { AchievementCount, GetAchievementCountResponse } from "./models";

/**
 * A call to this function will retrieve the list of
 * achievement IDs for a game, targeted by game ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @example
 * ```
 * const achievementCount = await getAchievementCount(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object containing a gameId and a list of
 * achievementIds.
 * ```
 * { gameId: 14402, achievementIds: [1,2,3,4,5] }
 * ```
 */
export const getAchievementCount = async (
  authorization: AuthObject,
  payload: { gameId: ID }
): Promise<AchievementCount> => {
  const { gameId } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetAchievementCount.php",
    authorization,
    { i: gameId }
  );

  const rawResponse = await call<GetAchievementCountResponse>({ url });

  return serializeProperties(rawResponse);
};
