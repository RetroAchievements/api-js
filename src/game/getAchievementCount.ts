import {
  type CommonCallOptions,
  apiBaseUrl,
  buildRequestUrl,
  call
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetAchievementCountResponse } from "./models";

/**
 * A call to this function will retrieve the list of
 * achievement IDs for a game.
 *
 * @param authorization An object containing your userName and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param options.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @param options.isPropertyCleaningEnabled Enabled by default.
 * The RetroAchievements.org API returns PascalCase'd responses
 * that often contain only string-typed values. When this option
 * is enabled, a mapping function is executed to convert keys to
 * be camelCased and cast strings to numbers and/or dates.
 *
 * @example
 * ```
 * const achievementCount = await getAchievementCount(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object containing a gameID and a list of
 * achievementIDs.
 * ```
 * { gameId: 14402, achievementIds: [1,2,3,4,5] }
 * ```
 */
export const getAchievementCount = async (
  authorization: AuthObject,
  payload: { gameId: number },
  options?: CommonCallOptions
) => {
  const isPropertyCleaningEnabled = options?.isPropertyCleaningEnabled ?? true;
  const { gameId } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetAchievementCount.php",
    authorization,
    { i: gameId }
  );

  const rawResponse = await call<GetAchievementCountResponse>({ url });

  return isPropertyCleaningEnabled ? cleanProperties(rawResponse) : rawResponse;
};

const cleanProperties = (rawResponse: GetAchievementCountResponse) => {
  return {
    gameId: rawResponse.GameID,
    achievementIds: rawResponse.AchievementIDs
  };
};
