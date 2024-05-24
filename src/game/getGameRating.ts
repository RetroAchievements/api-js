import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GameRating, GetGameRatingResponse } from "./models";

/**
 * A call to this function will retrieve metadata about
 * how users have rated the game and its set.
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
 * const gameRating = await getGameRating(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object with game rating metadata.
 * ```json
 * {
 *   gameId: 14402,
 *   ratings: {
 *     game: 3.1875,
 *     achievements: 0,
 *     gameNumVotes: 16,
 *     achievementsNumVotes: 0
 *   }
 * }
 * ```
 */
export const getGameRating = async (
  authorization: AuthObject,
  payload: { gameId: ID }
): Promise<GameRating> => {
  const { gameId } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameRating.php",
    authorization,
    { i: gameId }
  );

  const rawResponse = await call<GetGameRatingResponse>({ url });

  return serializeProperties(rawResponse);
};
