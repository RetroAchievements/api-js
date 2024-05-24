import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetUserGameRankAndScoreResponse,
  UserGameRankAndScore,
} from "./models";

/**
 * A call to this function will retrieve metadata about
 * how a particular user has performed/ranked on a particular
 * game, targeted by game ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @param payload.username The user for which to retrieve the
 * game ranking metadata for.
 *
 * @example
 * ```
 * const userGameRankAndScore = await getUserGameRankAndScore(
 *   authorization,
 *   { gameId: 14402, username: "xelnia" }
 * );
 * ```
 *
 * @returns An array containing metadata about the user's
 * rank and score for the target game ID. If metadata
 * cannot be found, the array is empty.
 * ```json
 * [
 *   {
 *     user: "xelnia",
 *     totalScore: 378,
 *     lastAward: "2022-09-01 21:51:23",
 *     userRank: 3
 *   }
 * ]
 * ```
 */
export const getUserGameRankAndScore = async (
  authorization: AuthObject,
  payload: { gameId: ID; username: string }
): Promise<UserGameRankAndScore> => {
  const { gameId, username } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserGameRankAndScore.php",
    authorization,
    { g: gameId, u: username }
  );

  const rawResponse = await call<GetUserGameRankAndScoreResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["TotalScore", "UserRank"],
  });
};
